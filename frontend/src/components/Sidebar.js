import { Link, useLocation } from "react-router-dom";

function Sidebar() {

  const location =
    useLocation();

  const isActive = (path) => {

    return location.pathname === path
      ? "sidebar-active"
      : "";

  };

  return (

    <div

      className="sidebar-container"

      style={{
        width: "260px",
        minHeight: "100vh"
      }}

    >

      <h3 className="mb-5 fw-bold">

        🚀 TalentIQ AI

      </h3>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">

          <Link

            to="/dashboard"

            className={`nav-link sidebar-link ${isActive(
              "/dashboard"
            )}`}

          >

            📊 Dashboard

          </Link>

        </li>

        <li className="nav-item mb-2">

          <Link

            to="/resumes"

            className={`nav-link sidebar-link ${isActive(
              "/resumes"
            )}`}

          >

            📄 Resumes

          </Link>

        </li>

        <li className="nav-item mb-2">

          <Link

            to="/jobs"

            className={`nav-link sidebar-link ${isActive(
              "/jobs"
            )}`}

          >

            💼 Jobs

          </Link>

        </li>

        <li className="nav-item mb-2">

          <Link

            to="/match"

            className={`nav-link sidebar-link ${isActive(
              "/match"
            )}`}

          >

            🎯 Match Analysis

          </Link>

        </li>

        <li className="nav-item mb-2">

          <Link

            to="/ranking"

            className={`nav-link sidebar-link ${isActive(
              "/ranking"
            )}`}

          >

            🏆 Candidate Ranking

          </Link>

        </li>

      </ul>

    </div>

  );
}

export default Sidebar;