from sentence_transformers import (
    SentenceTransformer
)

from sklearn.metrics.pairwise import (
    cosine_similarity
)

model = SentenceTransformer(
    "all-MiniLM-L6-v2"
)


def calculate_match_score(
    resume_text,
    job_text
):

    embeddings = model.encode(
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