from pydantic import BaseModel
from typing import Optional

class ApplicationCreate(BaseModel):
    company_name: str
    job_title: str
    date_applied: str
    salary: Optional[str] = None
    job_link: Optional[str] = None
    notes: Optional[str] = None

class ApplicationUpdate(BaseModel):
    status: Optional[str] = None
    salary: Optional[str] = None
    notes: Optional[str] = None

class ApplicationResponse(BaseModel):
    id: int
    company_name: str
    job_title: str
    status: str
    date_applied: str
    salary: Optional[str] = None
    job_link: Optional[str] = None
    notes: Optional[str] = None

    class Config:
        from_attributes = True