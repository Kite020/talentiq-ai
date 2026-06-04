from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.utils.db_dependency import (
    get_db
)

from app.models.resume_model import Resume

from app.auth.get_current_user import (
    get_current_user
)

from app.services.pdf_parser import (
    extract_text_from_pdf
)

router = APIRouter()


@router.post("/upload-resume")
async def upload_resume(

    file: UploadFile = File(...),

    db: Session = Depends(get_db),

    current_user=Depends(
        get_current_user
    )
):
    existing_resume = db.query(
        Resume
    ).filter(
        Resume.filename == file.filename,
        Resume.user_id == current_user.id
    ).first()

    if existing_resume:

        raise HTTPException(
            status_code=400,
            detail="Resume already uploaded"
        )
    


    file_path = (
        f"uploads/{file.filename}"
    )

    with open(
        file_path,
        "wb"
    ) as buffer:

        buffer.write(
            await file.read()
        )

    extracted_text = (
        extract_text_from_pdf(
            file_path
        )
    )
    print(
        "UPLOADING FOR USER:",
        current_user.id,
        current_user.email
    )

    resume = Resume(

        filename=file.filename,

        extracted_text=
        extracted_text,

        user_id=current_user.id
    )

    db.add(resume)

    db.commit()

    db.refresh(resume)

    return {

        "resume_id":
        resume.id,

        "filename":
        resume.filename,

        "text_preview":
        extracted_text[:500]
    }

@router.get("/resumes")
def get_all_resumes(

    db: Session = Depends(get_db),

    current_user=Depends(
        get_current_user
    )
):
    print(
        "CURRENT USER:",
        current_user.id,
        current_user.email
    )


    resumes = db.query(
        Resume
    ).filter(
        Resume.user_id == current_user.id
    ).all()

    for resume in resumes:

        print(
            resume.filename,
            "OWNER:",
            resume.user_id
        )

    return resumes