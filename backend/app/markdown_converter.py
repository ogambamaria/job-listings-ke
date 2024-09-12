from transformers import pipeline
import json

# Initialize a summarizer using Hugging Face's BART model
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

# Function to convert job data to markdown format
def generate_markdown(job_list):
    markdown_jobs = []
    for job in job_list:
        description = f"Job Title: {job['title']}\nCompany: {job['company']}\nLocation: {job['location']}\nPosted on: {job['posted_on']}"
        summary = summarizer(description, max_length=150, min_length=40, do_sample=False)
        markdown_content = f"# {job['title']}\n\n**Company**: {job['company']}\n\n**Location**: {job['location']}\n\n**Posted On**: {job['posted_on']}\n\n**Summary**: {summary[0]['summary_text']}\n"
        markdown_jobs.append(markdown_content)
    return markdown_jobs

# Function to save the markdown content to a file
def save_to_markdown_file(markdown_jobs):
    with open("output/jobs.md", "w") as f:
        f.write("\n".join(markdown_jobs))

# Function to process the scraped jobs and convert them to markdown
def process_jobs():
    with open("output/jobs.json", "r") as f:
        jobs = json.load(f)
    markdown_jobs = generate_markdown(jobs)
    save_to_markdown_file(markdown_jobs)
