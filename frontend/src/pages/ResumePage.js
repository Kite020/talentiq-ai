import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function ResumePage() {

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [file, setFile] = useState(null);
  useEffect(() => {

    fetchResumes();
  
  }, []);

  const fetchResumes = async () => {

    try {
  
      const token =
        localStorage.getItem("token");
  
      const response = await axios.get(
  
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
  
    } catch (error) {
  
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {

    if (!file) {

      alert("Please select a file");

      return;
    }

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    try {
      setUploading(true);

      const token =
        localStorage.getItem("token");

      

      await axios.post(

        "https://talentiq-ai-backend.onrender.com/upload-resume",

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "multipart/form-data"
          }
        }
      );
      setUploading(false);

      alert(
        "Resume uploaded successfully"
      );
      fetchResumes();

    } catch (error) {

      if (
        error.response &&
        error.response.data.detail
      ) {
    
        alert(
          error.response.data.detail
        );
    
      } else {
    
        alert(
          "Upload failed"
        );
    
      }
    }
  };
  if (loading) {

    return (
  
      <div
        className="
        d-flex
        justify-content-center
        mt-5"
      >
  
        <div
          className="
          spinner-border
          text-primary"
        >
        </div>
  
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
              Upload Resume
            </h3>

            <input
              type="file"
              className="form-control mb-3"
              accept=".pdf"
              onChange={(e) =>
                setFile(
                  e.target.files[0]
                )
              }
            />

            <button

              className="btn btn-primary"

              onClick={handleUpload}

              disabled={uploading}

            >

              {

                uploading

                  ? "Uploading..."

                  : "Upload Resume"

              }

            </button>

          </div>
          <div className="card shadow mt-4">

            <div className="card-body">

              <h4 className="mb-3">

                Uploaded Resumes

              </h4>

              <table className="table">

                <thead>

                  <tr>

                    <th>ID</th>

                    <th>File Name</th>

                  </tr>

                </thead>

                <tbody>

                  {resumes.map((resume) => (

                    <tr key={resume.id}>

                      <td>
                        {resume.id}
                      </td>

                      <td>
                        {resume.filename}
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

export default ResumePage;