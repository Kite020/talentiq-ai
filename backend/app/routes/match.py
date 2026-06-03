from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models.resume_model import Resume
from app.models.job_model import JobDescription

from app.utils.db_dependency import get_db

from app.auth.get_current_user import (
    get_current_user
)

from app.services.matching_service import (
    calculate_match_score
)

from app.services.matching_service import (
    get_skill_gap
)

router = APIRouter()


@router.get("/match/{resume_id}/{job_id}")
def match_resume_to_job(

    resume_id: int,

    job_id: int,

    db: Session = Depends(get_db),

    current_user=Depends(
        get_current_user
    )
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id
    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    job = db.query(JobDescription).filter(
        JobDescription.id == job_id
    ).first()

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    score = calculate_match_score(

        resume.extracted_text,

        job.description
    )

    skill_report = get_skill_gap(
        resume.extracted_text,
        job.description
    )

    return {

        "resume_id":
        resume.id,

        "job_id":
        job.id,

        "match_score":
        score,

        "skills_found":
        skill_report[
            "skills_found"
        ],

        "missing_skills":
        skill_report[
            "missing_skills"
        ]
    }