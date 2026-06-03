def generate_recruiter_summary(

    match_score,

    skills_found,

    missing_skills

):

    summary = ""

    if match_score >= 80:

        summary += (
            "Highly suitable candidate. "
        )

    elif match_score >= 60:

        summary += (
            "Moderately suitable candidate. "
        )

    else:

        summary += (
            "Candidate partially matches the role. "
        )

    if skills_found:

        summary += (
            "Strong skills include "
            + ", ".join(skills_found[:5])
            + ". "
        )

    if missing_skills:

        summary += (
            "Missing skills include "
            + ", ".join(missing_skills)
            + "."
        )

    return summary