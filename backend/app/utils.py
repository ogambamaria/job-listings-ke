from transformers import pipeline

# Initialize the summarizer pipeline with BART or T5
summarizer = pipeline("summarization", model="facebook/bart-large-cnn")

def analyze_skills(job_description):
    # Use the summarizer to extract key information
    summary = summarizer(job_description, max_length=150, min_length=40, do_sample=False)
    return summary[0]['summary_text']

# Use a pretrained NER model
ner = pipeline("ner", model="dslim/bert-base-NER")

def extract_skills(job_description):
    entities = ner(job_description)
    skills = [entity['word'] for entity in entities if entity['entity'] == 'B-SKILL']  # Filter for skill entities
    return skills