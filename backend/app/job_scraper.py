import requests
import feedparser
import xml.etree.ElementTree as ET
from models import JobPost, SessionLocal
from sqlalchemy.orm import Session
from datetime import datetime

RSS_FEED_URL = "https://www.myjobmag.co.ke/jobsxml_by_categories.xml"

def parse_cdata(elem):
    """Extracts CDATA text or returns 'N/A' if not present."""
    return elem.text.strip() if elem is not None and elem.text else "N/A"

def scrape_rss_feed(db: Session):
    # Fetch the RSS feed (XML format)
    response = requests.get(RSS_FEED_URL)
    if response.status_code == 200:
        root = ET.fromstring(response.content)

        new_jobs_count = 0  # Track the number of new jobs added

        # Iterate over each <item> in the RSS feed
        for item in root.findall(".//item"):
            title = parse_cdata(item.find("title"))
            industry = parse_cdata(item.find("industry"))
            position = parse_cdata(item.find("position"))
            company = parse_cdata(item.find("company"))
            location = parse_cdata(item.find("location"))
            link = parse_cdata(item.find("link"))
            pubDate = item.find("pubDate").text if item.find("pubDate") is not None else None
            description = parse_cdata(item.find("description"))

            # Convert pubDate to datetime format
            try:
                published_on = datetime.strptime(pubDate, "%a, %d %b %Y %H:%M:%S %Z") if pubDate else None
            except ValueError:
                published_on = None  # Handle invalid date format

            # Check if the job already exists in the DB based on title and published date
            existing_job = db.query(JobPost).filter(
                JobPost.title == title,
                JobPost.published == published_on
            ).first()

            # If the job does not exist, add it to the database
            if not existing_job:
                job_post = JobPost(
                    title=title,
                    industry=industry,
                    position=position,
                    company=company,
                    location=location,
                    description=description,
                    published=published_on,
                    link=link
                )
                db.add(job_post)
                new_jobs_count += 1  # Increment count of new jobs

        # Commit new jobs to the database
        db.commit()
        return {"message": f"{new_jobs_count} new jobs scraped and saved to the database."}
    else:
        return {"error": "Failed to fetch the RSS feed"}
