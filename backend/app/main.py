from fastapi import FastAPI

from app.routes.auth import router as auth_router

app = FastAPI(
    title="TalentIQ AI"
)

app.include_router(auth_router)


@app.get("/")
def home():

    return {
        "message":
        "TalentIQ AI Backend Running"
    }