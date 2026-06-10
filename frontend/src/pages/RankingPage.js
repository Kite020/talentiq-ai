import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function RankingPage() {

  const [jobs, setJobs] = useState([]);

  const [selectedJob, setSelectedJob] =
    useState("");

  const [rankings, setRankings] =
    useState([]);

  const [pageLoading, setPageLoading] =
    useState(true);
  
  const [rankingLoading, setRankingLoading] =
    useState(false);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

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

    } catch (error) {

      console.error(error);

    } finally {

      setPageLoading(false);
    
    }
  };

  const rankCandidates = async () => {

    try {
      setRankingLoading(true);


      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(

          `https://talentiq-ai-backend.onrender.com/rank/${selectedJob}`,

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setRankings(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ranking failed"
      );
    } finally {
      setRankingLoading(false);
    }
  };

  const getBadge = (index) => {

    if (index === 0) {
      return "🏆";
    }
    
    if (index === 1) {
      return "🥈";
    }
    
    if (index === 2) {
      return "🥉";
    }

    return "🏅";
  };

  if (pageLoading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container mt-4">
          

          <div className="card shadow p-4">

            <h3 className="mb-4">

              Candidate Ranking

            </h3>

            <select

              className="form-select mb-3"

              value={selectedJob}

              onChange={(e) =>
                setSelectedJob(
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

              onClick={rankCandidates}

              disabled={rankingLoading}

            >

              {

                rankingLoading

                  ? "Ranking Candidates..."

                  : "Rank Candidates"

              }

            </button>

          </div>

          <div className="alert alert-info">

            <strong>

              {rankings.length}

            </strong>

            {" "}

            candidates ranked
            successfully.

          </div>

          {rankings.length > 0 && (

            <div className="card shadow mt-4">

              <div className="card-body">

                <h4 className="mb-4">

                  Ranking Results

                </h4>

                <div className="row">

                  {rankings.map(

                    (candidate, index) => (

                      <div
                        key={index}
                        className="col-md-6 mb-4"
                      >

                        <div className="card shadow border-0 h-100">

                          <div className="card-body">

                            <h4>

                              {getBadge(index)}

                              {" "}

                              Rank #{index + 1}

                            </h4>

                            <hr />

                            <h5>

                              {candidate.filename}

                            </h5>

                            <p className="text-muted">

                              Resume ID:
                              {" "}
                              {candidate.resume_id}

                            </p>

                            <div
                              className="progress mb-3"
                            >

                              <div

                                className="progress-bar"

                                style={{
                                  width:
                                    `${candidate.score}%`
                                }}

                              >

                                {candidate.score}%

                              </div>

                            </div>

                            <h5>

                              Match Score:
                              {" "}
                              {candidate.score}%

                            </h5>

                          </div>

                        </div>

                      </div>

                    )

                  )}

                </div>

              </div>

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default RankingPage;