from fastapi import FastAPI

app = FastAPI(
    title="TalentIQ AI",
    version="1.0.0"
)

@app.get("/")
def home():

    return {
        "message":
        "TalentIQ AI Backend Running"
    }