from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

Base = declarative_base()

class JobPost(Base):
    __tablename__ = 'jobs'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    industry = Column(String, nullable=True)  # Add this field
    position = Column(String, nullable=True)  # Add this field
    company = Column(String, nullable=True)
    location = Column(String, nullable=True)
    description = Column(String, nullable=True)
    published = Column(DateTime, nullable=True)
    link = Column(String, nullable=True)

# Create the SQLite engine
DATABASE_URL = "sqlite:///jobs.db"
engine = create_engine(DATABASE_URL)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create all tables
Base.metadata.create_all(bind=engine)
