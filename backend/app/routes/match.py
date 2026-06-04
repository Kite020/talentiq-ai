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

from app.services.recruiter_summary import (
    generate_recruiter_summary
)

from app.services.skill_match import (
    calculate_skill_match_percentage
)

from app.services.explainable_matching import (
    generate_match_explanation
)

from app.services.interview_generator import (
    generate_interview_questions
)
from app.models.match_result import MatchResult

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

    skills_found = skill_report["skills_found"]

    missing_skills = skill_report["missing_skills"]

    skill_match_percentage = (
        calculate_skill_match_percentage(
            skills_found,
            missing_skills
        )
    )

    overall_score = round(
        (
            score
            + skill_match_percentage
        ) / 2,
        2
    )

    existing_match = db.query(
        MatchResult
    ).filter(
        MatchResult.resume_id == resume.id,
        MatchResult.job_id == job.id
    ).first()

    if not existing_match:

        match_result = MatchResult(

            resume_id=resume.id,

            job_id=job.id,

            user_id=current_user.id,

            overall_score=overall_score
        )

        db.add(match_result)
        db.commit()

    summary = generate_recruiter_summary(
        score,
        skills_found,
        missing_skills
    )

    explanation = (
        generate_match_explanation(
            skills_found,
            missing_skills
        )
    )

    interview_questions = (
        generate_interview_questions(
            skills_found,
            missing_skills
        )
    )

    return {

        "resume_id":
        resume.id,

        "job_id":
        job.id,

        "semantic_score":
        round(score, 2),

        "skill_match_percentage":
        skill_match_percentage,

        "overall_score":
        overall_score,

        "strengths":
        explanation["strengths"],

        "weaknesses":
        explanation["weaknesses"],

        "recommendation":
        explanation["recommendation"],

        "skills_found":
        skills_found,

        "missing_skills":
        missing_skills,

        "recruiter_summary":
        summary,

        "interview_questions":
        interview_questions,
    }