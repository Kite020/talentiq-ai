from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.utils.db_dependency import get_db

from app.models.resume_model import Resume
from app.models.job_model import JobDescription

from app.services.matching_service import (
    calculate_match_score
)

router = APIRouter()


@router.get("/rank/{job_id}")
def rank_candidates(

    job_id: int,

    db: Session = Depends(get_db)
):

    job = db.query(
        JobDescription
    ).filter(
        JobDescription.id == job_id
    ).first()

    if not job:

        return {
            "error":
            "Job not found"
        }

    resumes = db.query(
        Resume
    ).all()

    rankings = []

    for resume in resumes:

        score = calculate_match_score(

            resume.extracted_text,

            job.description
        )

        rankings.append({

            "resume_id":
            resume.id,

            "filename":
            resume.filename,

            "score":
            score
        })

    rankings.sort(

        key=lambda x: x["score"],

        reverse=True
    )

    return rankings