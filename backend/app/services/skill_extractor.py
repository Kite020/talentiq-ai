SKILLS = [

    "Python",
    "Java",
    "C",
    "C++",
    "C#",
    "JavaScript",
    "TypeScript",

    "HTML",
    "CSS",
    "Bootstrap",
    "Tailwind CSS",

    "React",
    "Angular",
    "Vue.js",
    "Node.js",
    "Express.js",

    "FastAPI",
    "Flask",
    "Django",

    "SQL",
    "MySQL",
    "PostgreSQL",
    "MongoDB",
    "SQLite",

    "Git",
    "GitHub",
    "Docker",
    "Kubernetes",

    "AWS",
    "Azure",
    "Google Cloud",

    "REST API",
    "GraphQL",

    "Power BI",
    "Tableau",
    "Excel",
    "Power Query",
    "DAX",

    "Data Analysis",
    "Data Visualization",
    "Business Intelligence",
    "Data Mining",
    "Statistics",

    "Machine Learning",
    "Deep Learning",
    "Artificial Intelligence",
    "NLP",
    "Computer Vision",

    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Keras",

    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",

    "Linux",
    "Operating Systems",
    "Computer Networks",
    "DBMS",

    "Agile",
    "Scrum",

    "Problem Solving",
    "Data Structures",
    "Algorithms",

    "Cyber Security",
    "Cloud Computing",

    "Jenkins",
    "CI/CD",

    "Figma",
    "UI/UX Design"
]


def extract_skills(text):

    found_skills = []

    text_lower = text.lower()

    for skill in SKILLS:

        if skill.lower() in text_lower:

            found_skills.append(skill)

    return list(set(found_skills))