import scrapy
from scrapy.crawler import CrawlerProcess

# Define the JobSpider class to scrape job listings
class JobSpider(scrapy.Spider):
    name = "jobs"
    start_urls = [
        'https://www.brightermonday.co.ke/jobs'
        # 'https://www.myjobmag.co.ke/jobs'
    ]  # Replace with actual job website URL

    def parse(self, response):
        for job in response.css('div.job-listing'):
            yield {
                'title': job.css('h2::text').get(),
                'company': job.css('span.company-name::text').get(),
                'location': job.css('span.location::text').get(),
                'posted_on': job.css('span.posted-on::text').get(),
            }

        # Follow pagination links
        next_page = response.css('a.next::attr(href)').get()
        if next_page:
            yield response.follow(next_page, self.parse)

# Function to run the scraper and store results in a JSON file
def run_scraper():
    process = CrawlerProcess(settings={
        "FEEDS": {"output/jobs.json": {"format": "json"}},
    })
    process.crawl(JobSpider)
    process.start()
