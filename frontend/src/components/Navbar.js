import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="d-flex justify-content-between align-items-center p-3 bg-white shadow-sm">

      <h4 className="mb-0">

        TalentIQ AI

      </h4>

      <button

        className="btn btn-danger"

        onClick={handleLogout}

      >

        Logout

      </button>

    </div>

  );
}

export default Navbar;