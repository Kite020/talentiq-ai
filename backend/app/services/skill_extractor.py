SKILLS = [

    "Python",
    "Java",
    "JavaScript",
    "React",
    "Node.js",
    "SQL",
    "MongoDB",
    "Docker",
    "Kubernetes",
    "AWS",
    "Azure",
    "FastAPI",
    "Flask",
    "Git",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy"
]


def extract_skills(text):

    found_skills = []

    text_lower = text.lower()

    for skill in SKILLS:

        if skill.lower() in text_lower:

            found_skills.append(skill)

    return found_skills