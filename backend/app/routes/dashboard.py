from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.utils.db_dependency import get_db

from app.models.resume_model import Resume
from app.models.job_model import JobDescription
from sqlalchemy import func

from app.models.match_result import (
    MatchResult
)
from app.auth.get_current_user import (
    get_current_user
)

router = APIRouter()


@router.get("/dashboard-stats")
def get_dashboard_stats(

    db: Session = Depends(get_db),
    current_user=Depends(
        get_current_user
    )

):

    total_resumes = db.query(
        Resume
    ).filter(
        Resume.user_id == current_user.id
    ).count()

    total_jobs = db.query(
        JobDescription
    ).filter(
        JobDescription.user_id == current_user.id
    ).count()

    total_matches = (
        total_resumes *
        total_jobs
    )
    average_score = db.query(
        func.avg(
            MatchResult.overall_score
        )
    ).filter(
        MatchResult.user_id == current_user.id
    ).scalar()

    if average_score is None:

        average_score = 0
    
    all_scores = db.query(
        MatchResult
    ).filter(
        MatchResult.user_id == current_user.id
    ).all()

    excellent = 0
    good = 0
    average = 0
    poor = 0

    for item in all_scores:

        if item.overall_score >= 80:

            excellent += 1

        elif item.overall_score >= 60:

            good += 1

        elif item.overall_score >= 40:

            average += 1

        else:

            poor += 1

    return {

        "total_resumes":
        total_resumes,

        "total_jobs":
        total_jobs,

        "total_matches":
        total_matches,

        "average_match_score":
        round(average_score, 2),

        "excellent":
        excellent,

        "good":
        good,

        "average":
        average,

        "poor":
        poor
    }