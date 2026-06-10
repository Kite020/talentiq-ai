import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleLogin = async () => {

    try {

      const response =
        await axios.post(

          "http://127.0.0.1:8000/login",

          {
            email,
            password
          }
        );

      localStorage.setItem(

        "token",

        response.data.access_token
      );

      navigate(
        "/dashboard"
      );

    } catch (error) {

      console.log("LOGIN ERROR");
    
      console.log(error);
    
      console.log(error.response);
    
      console.log(error.response?.data);
    
      alert(
        JSON.stringify(
          error.response?.data || error.message
        )
      );
    }
  };

  return (

    <div className="container mt-5">

      <div className="row justify-content-center">

        <div className="col-md-5">

          <div className="card shadow">

            <div className="card-body p-4">

              <h2 className="text-center mb-4">

                TalentIQ AI

              </h2>

              <input

                type="email"

                placeholder="Email"

                className="form-control mb-3"

                value={email}

                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }

              />

              <input

                type="password"

                placeholder="Password"

                className="form-control mb-3"

                value={password}

                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }

              />

              <button

                className="btn btn-primary w-100"

                onClick={handleLogin}

              >

                Login

              </button>

              <div className="text-center mt-3">

                <a href="/signup">

                  Create Account

                </a>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default LoginPage;