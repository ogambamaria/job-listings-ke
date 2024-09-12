from apscheduler.schedulers.background import BackgroundScheduler
from job_scraper import scrape_rss_feed

def start_scheduler():
    scheduler = BackgroundScheduler()
    # Schedule the job to run once a day
    scheduler.add_job(scrape_rss_feed, 'interval', days=1)
    scheduler.start()
