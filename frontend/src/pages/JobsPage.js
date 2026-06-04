import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function JobsPage() {

  const [title, setTitle] = useState("");

  const [description, setDescription] =
    useState("");

  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const response = await axios.get(

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

    }
  };

  useEffect(() => {

    fetchJobs();

  }, []);

  const createJob = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(

        "https://talentiq-ai-backend.onrender.com/create-job",

        {
          title,
          description
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      alert(
        "Job created successfully"
      );

      setTitle("");

      setDescription("");

      fetchJobs();

    } catch (error) {

      console.error(error);

      alert(
        "Job creation failed"
      );
    }
  };

  return (

    <div className="d-flex">

      <Sidebar />

      <div className="flex-grow-1">

        <Navbar />

        <div className="container mt-4">

          {/* Create Job */}

          <div className="card shadow p-4">

            <h3 className="mb-4">

              Create Job

            </h3>

            <input

              type="text"

              className="form-control mb-3"

              placeholder="Job Title"

              value={title}

              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }

            />

            <textarea

              className="form-control mb-3"

              rows="6"

              placeholder="Job Description"

              value={description}

              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }

            />

            <button

              className="btn btn-success"

              onClick={createJob}

            >
              Create Job
            </button>

          </div>

          {/* Jobs Table */}

          <div className="card shadow mt-4">

            <div className="card-body">

              <h4 className="mb-3">

                Available Jobs

              </h4>

              <table className="table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>Title</th>

                  </tr>

                </thead>

                <tbody>

                  {jobs.map((job) => (

                    <tr key={job.id}>

                      <td>
                        {job.id}
                      </td>

                      <td>
                        {job.title}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default JobsPage;