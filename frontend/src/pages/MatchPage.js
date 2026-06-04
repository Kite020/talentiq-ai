import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MatchPage() {

  const [resumes, setResumes] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [resumeId, setResumeId] = useState("");
  const [jobId, setJobId] = useState("");

  const [result, setResult] = useState(null);

  useEffect(() => {

    fetchResumes();
    fetchJobs();

  }, []);

  const fetchResumes = async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(

        "https://talentiq-ai-backend.onrender.com/resumes",

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setResumes(
      response.data
    );
  };

  const fetchJobs = async () => {

    const token =
      localStorage.getItem("token");

    const response =
      await axios.get(

        "https://talentiq-ai-backend.onrender.com/jobs",

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

    setJobs(
      response.data
    );
  };

  const runMatch = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(

          `https://talentiq-ai-backend.onrender.com/match/${resumeId}/${jobId}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setResult(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Match failed"
      );
    }
  };

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container mt-4">

          <div className="card shadow p-4">

            <h3 className="mb-4">

              Match Analysis

            </h3>

            <select

              className="form-select mb-3"

              value={resumeId}

              onChange={(e) =>
                setResumeId(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Resume
              </option>

              {resumes.map((resume) => (

                <option
                  key={resume.id}
                  value={resume.id}
                >
                  {resume.filename}
                </option>

              ))}

            </select>

            <select

              className="form-select mb-3"

              value={jobId}

              onChange={(e) =>
                setJobId(
                  e.target.value
                )
              }
            >

              <option value="">
                Select Job
              </option>

              {jobs.map((job) => (

                <option
                  key={job.id}
                  value={job.id}
                >
                  {job.title}
                </option>

              ))}

            </select>

            <button

              className="btn btn-primary"

              onClick={runMatch}

            >
              Run Match Analysis
            </button>

          </div>

          {result && (

            <div className="card shadow mt-4">

              <div className="card-body">

                <h3>
                  Match Results
                </h3>

                <hr />

                <div className="row mb-4">

                  <div className="col-md-4">

                    <div className="card shadow border-0">

                      <div className="card-body text-center">

                        <h6 className="text-muted">

                          Semantic Score

                        </h6>

                        <h2 className="fw-bold">

                          {result.semantic_score}%

                        </h2>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="card shadow border-0">

                      <div className="card-body text-center">

                        <h6 className="text-muted">

                          Skill Match

                        </h6>

                        <h2 className="fw-bold">

                          {result.skill_match_percentage}%

                        </h2>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="card shadow border-0">

                      <div className="card-body text-center">

                        <h6 className="text-muted">

                          Overall Score

                        </h6>

                        <h2 className="fw-bold">

                          {result.overall_score}%

                        </h2>

                      </div>

                    </div>

                  </div>

                </div>

                <div className="mb-4">

                  <h6>Semantic Score</h6>

                  <div className="progress mb-3">

                    <div

                      className="progress-bar"

                      style={{
                        width:
                          `${result.semantic_score}%`
                      }}

                    >

                      {result.semantic_score}%

                    </div>

                  </div>

                  <h6>Skill Match</h6>

                  <div className="progress mb-3">

                    <div

                      className="progress-bar bg-success"

                      style={{
                        width:
                          `${result.skill_match_percentage}%`
                      }}

                    >

                      {result.skill_match_percentage}%

                    </div>

                  </div>

                  <h6>Overall Score</h6>

                  <div className="progress">

                    <div

                      className="progress-bar bg-warning"

                      style={{
                        width:
                          `${result.overall_score}%`
                      }}

                    >

                      {result.overall_score}%

                    </div>

                  </div>

                </div>

                <hr />

                <h5>
                  Strengths
                </h5>

                <div className="mb-4">

                  {result.strengths.map(

                    (skill, index) => (

                      <span

                        key={index}

                        className="badge bg-success me-2 mb-2 p-2"

                      >

                        {skill}

                      </span>

                    )
                  )}

                </div>

                <h5>
                  Weaknesses
                </h5>

                <div className="mb-4">

                  {result.weaknesses.length === 0 ? (

                    <span className="badge bg-success p-2">

                      No Skill Gaps

                    </span>

                  ) : (

                    result.weaknesses.map(

                      (skill, index) => (

                        <span

                          key={index}

                          className="badge bg-danger me-2 mb-2 p-2"

                        >

                          {skill}

                        </span>

                      )
                    )

                  )}

                </div>

                <div className="card border-0 bg-warning-subtle mb-4">

                  <div className="card-body">

                    <h5>

                      📌 Recommendation

                    </h5>

                    <p className="mb-0">

                      {result.recommendation}

                    </p>

                  </div>

                  </div>

                <div className="card border-0 bg-light mb-4">

                  <div className="card-body">

                    <h5>

                      💡 Recruiter Insight

                    </h5>

                    <p className="mb-0">

                      {result.recruiter_summary}

                    </p>

                  </div>

                  </div>

                <h5>
                  Interview Questions
                </h5>

                <ul>

                  {result.interview_questions.map(
                    (question, index) => (

                      <li key={index}>
                        {question}
                      </li>

                    )
                  )}

                </ul>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default MatchPage;