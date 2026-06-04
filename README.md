# TalentIQ AI 🚀

An AI-powered Resume Screening and Candidate Ranking Platform that helps recruiters efficiently evaluate resumes against job descriptions using semantic matching, skill gap analysis, candidate ranking, and recruiter-focused insights.

## 🌐 Live Demo

Frontend: https://talentiq-ai-khaki.vercel.app

Backend API: https://talentiq-ai-backend.onrender.com

---

## 📌 Project Overview

TalentIQ AI automates the recruitment screening process by analyzing resumes against job descriptions and generating intelligent insights.

The platform allows recruiters to:

* Upload resumes
* Create job descriptions
* Match candidates with jobs
* Analyze skill gaps
* Rank candidates based on suitability
* View recruiter-focused dashboards
* Generate interview questions automatically

---

## ✨ Features

### 🔐 Authentication & Authorization

* User Signup
* User Login
* JWT Authentication
* Protected API Routes
* Multi-user Support

### 📄 Resume Management

* PDF Resume Upload
* Automatic Resume Parsing
* Resume Storage in Database
* Duplicate Resume Prevention

### 💼 Job Management

* Create Job Descriptions
* Store Job Profiles
* User-specific Job Listings

### 🤖 AI Resume Matching

* Semantic Resume Matching
* Skill Extraction
* Skill Gap Analysis
* Match Score Calculation
* Candidate Suitability Evaluation

### 📊 Dashboard Analytics

* Total Resumes
* Total Jobs
* Total Matches
* Average Match Score
* Match Distribution Analysis

### 🏆 Candidate Ranking

* Rank Candidates for a Job
* Sort by Match Score
* Recruiter-friendly Candidate Comparison

### 🎯 Recruiter Insights

* Strengths Analysis
* Weakness Analysis
* Hiring Recommendation
* Recruiter Summary

### 🎤 Interview Preparation

* AI-generated Interview Questions
* Skill-based Question Suggestions

---

## 🏗️ System Architecture

```text
React Frontend (Vercel)
        │
        ▼
FastAPI Backend (Render)
        │
        ▼
PostgreSQL Database (Neon)
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Axios
* Bootstrap
* Recharts

### Backend

* FastAPI
* SQLAlchemy
* JWT Authentication
* PyMuPDF

### Database

* PostgreSQL (Neon)

### AI & Data Processing

* Scikit-learn
* TF-IDF Vectorization
* Cosine Similarity
* NLP-based Skill Extraction

---

## 📂 Project Structure

```text
Talent-IQ-AI/

├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── utils/
│   ├── requirements.txt
│   └── render.yaml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Kite020/talentiq-ai.git

cd Talent-IQ-AI
```

---

### Backend Setup

```bash
cd backend

python -m venv venv

source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

Backend will run at:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm start
```

Frontend will run at:

```text
http://localhost:3000
```

---

## 🔑 API Endpoints

### Authentication

```http
POST /signup
POST /login
```

### Resume Management

```http
POST /upload-resume
GET /resumes
```

### Job Management

```http
POST /create-job
GET /jobs
```

### Matching

```http
GET /match/{resume_id}/{job_id}
```

### Candidate Ranking

```http
GET /rank/{job_id}
```

### Dashboard

```http
GET /dashboard-stats
```

---

## 📈 Sample Workflow

1. Register/Login
2. Upload Resume
3. Create Job Description
4. Run Match Analysis
5. Review Skill Gaps
6. View Recruiter Insights
7. Generate Interview Questions
8. Rank Candidates
9. Analyze Dashboard Metrics

---

## 🔒 Security Features

* JWT Authentication
* Protected Routes
* User-specific Data Isolation
* Secure Password Hashing
* Authorization-based Access Control

---

## 🎯 Future Enhancements

* Resume Recommendation Engine
* Advanced NLP Models
* Resume Improvement Suggestions
* Email Notifications
* Recruiter Collaboration Tools
* Advanced Analytics Dashboard
* Role-based Access Control
* Token Refresh Mechanism

---

## 👩‍💻 Author

**Ankita Dash**

Aspiring Software Engineer | Full Stack Developer

LinkedIn: https://www.linkedin.com/in/ankita-dash-3377b1245/

GitHub: https://github.com/Kite020

