def calculate_skill_match_percentage(

    skills_found,

    missing_skills

):

    total_skills = (
        len(skills_found)
        +
        len(missing_skills)
    )

    if total_skills == 0:
        return 0

    percentage = (

        len(skills_found)

        /

        total_skills

    ) * 100

    return round(
        percentage,
        2
    )