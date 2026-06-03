from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.schemas.job_schema import JobCreate

from app.models.job_model import JobDescription

from app.utils.db_dependency import get_db

from app.auth.get_current_user import (
    get_current_user
)

router = APIRouter()


@router.post("/create-job")
def create_job(

    job: JobCreate,

    db: Session = Depends(get_db),

    current_user=Depends(
        get_current_user
    )
):

    new_job = JobDescription(

        title=job.title,

        description=job.description,

        user_id=current_user.id
    )

    db.add(new_job)

    db.commit()

    db.refresh(new_job)

    return {

        "job_id": new_job.id,

        "title": new_job.title
    }