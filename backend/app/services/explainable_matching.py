def generate_match_explanation(

    skills_found,

    missing_skills

):

    strengths = skills_found

    weaknesses = missing_skills

    if len(weaknesses) == 0:

        recommendation = (
            "Excellent fit for the role."
        )

    elif len(weaknesses) <= 2:

        recommendation = (
            "Good fit but can improve a few skills."
        )

    else:

        recommendation = (
            "Needs additional skill development."
        )

    return {

        "strengths":
        strengths,

        "weaknesses":
        weaknesses,

        "recommendation":
        recommendation
    }