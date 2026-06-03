from fastapi import FastAPI

from app.database import Base
from app.database import engine
from app.models.job_model import JobDescription

from app.models.user_model import User
from app.models.resume_model import Resume

from app.routes.auth import router as auth_router
from app.routes.resume import (
    router as resume_router
)
from app.routes.job import (
    router as job_router
)

from app.routes.match import (
    router as match_router
)

from app.routes.ranking import (
    router as ranking_router
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TalentIQ AI"
)
app.include_router(
    resume_router
)
app.include_router(job_router)

app.include_router(auth_router)

app.include_router(
    match_router
)

app.include_router(
    ranking_router
)


@app.get("/")
def home():

    return {
        "message":
        "TalentIQ AI Backend Running"
    }