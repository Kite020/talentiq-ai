from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

from app.services.skill_extractor import (
    extract_skills
)

model = None

def get_model():

    global model

    if model is None:

        model = SentenceTransformer(
            "all-MiniLM-L6-v2"
        )

    return model


def calculate_match_score(
    resume_text,
    job_text
):

    embeddings = get_model().encode(
        [resume_text, job_text]
    )

    score = cosine_similarity(
        [embeddings[0]],
        [embeddings[1]]
    )[0][0]

    return round(
        float(score * 100),
        2
    )

def get_skill_gap(
    resume_text,
    job_text
):

    resume_skills = extract_skills(
        resume_text
    )

    job_skills = extract_skills(
        job_text
    )

    missing_skills = [

        skill

        for skill in job_skills

        if skill not in resume_skills
    ]

    return {

        "skills_found":
        resume_skills,

        "missing_skills":
        missing_skills
    }