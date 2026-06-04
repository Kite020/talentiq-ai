def generate_interview_questions(

    skills_found,

    missing_skills

):

    questions = []

    skill_questions = {

        "Python":
        "Explain Python decorators and their use cases.",

        "FastAPI":
        "How does dependency injection work in FastAPI?",

        "SQL":
        "Explain the difference between INNER JOIN and LEFT JOIN.",

        "React":
        "What is the purpose of React hooks?",

        "Docker":
        "How would you containerize a FastAPI application?",

        "AWS":
        "Which AWS services would you use for deploying a web application?",

        "Machine Learning":
        "Explain the bias-variance tradeoff.",

        "Pandas":
        "How do you handle missing values in a dataset?"
    }

    for skill in skills_found:

        if skill in skill_questions:

            questions.append(
                skill_questions[skill]
            )

    for skill in missing_skills:

        questions.append(
            f"What is your experience with {skill}?"
        )

    return questions[:10]