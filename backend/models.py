from sqlalchemy import Column, Integer, String
from database import Base

class Application(Base):
    __tablename__ = "Applications"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String)
    job_title = Column(String)
    status = Column(String, default="Applied")
    date_applied = Column(String)
    salary = Column(String, nullable=True)
    job_link = Column(String, nullable=True)
    notes = Column(String, nullable=True)