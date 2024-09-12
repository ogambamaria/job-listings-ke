from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from models import JobPost, SessionLocal
from app.job_scraper import scrape_rss_feed
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get the database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint to trigger scraping from the RSS feed and save to the database
@app.post("/scrape-rss")
def scrape_rss(db: Session = Depends(get_db)):
    return scrape_rss_feed(db)

# Endpoint to fetch jobs from the database
@app.get("/jobs")
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(JobPost).all()
    return jobs

# Endpoint to get job statistics (jobs posted per day)
@app.get("/jobs/stats")
def get_job_stats(db: Session = Depends(get_db)):
    # Assuming 'published' is a datetime field in your JobPostDB model
    job_stats = (
        db.query(
            func.date(JobPost.published).label('date'),
            func.count(JobPost.id).label('count')
        )
        .group_by(func.date(JobPost.published))
        .all()
    )
    
    # Return the statistics in a friendly format
    return [{"date": stat[0], "count": stat[1]} for stat in job_stats]

@app.get("/jobs/{id}")
def get_job_by_id(id: int, db: Session = Depends(get_db)):
    job = db.query(JobPost).filter(JobPost.id == id).first()
    if not job:
        return {"error": "Job not found"}
    return job
