from sklearn.feature_extraction.text import (
    TfidfVectorizer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

from app.services.skill_extractor import (
    extract_skills
)


def calculate_match_score(
    resume_text,
    job_text
):

    vectorizer = TfidfVectorizer()

    vectors = vectorizer.fit_transform(
        [resume_text, job_text]
    )

    score = cosine_similarity(
        vectors[0],
        vectors[1]
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

    matched_skills = [

        skill

        for skill in job_skills

        if skill in resume_skills
    ]

    missing_skills = [

        skill

        for skill in job_skills

        if skill not in resume_skills
    ]

    return {

        "skills_found":
        matched_skills,

        "missing_skills":
        missing_skills
    }