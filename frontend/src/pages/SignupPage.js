import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignupPage() {

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate =
    useNavigate();

  const handleSignup = async () => {

    try {

      await axios.post(

        "http://127.0.0.1:8000/signup",

        {
          username,
          email,
          password
        }
      );

      alert(
        "Account created successfully"
      );

      navigate("/");

    } catch (error) {

      console.error(error);

      alert(
        "Signup failed"
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

                Create Account

              </h2>

              <input

                type="text"

                placeholder="Name"

                className="form-control mb-3"

                value={username}

                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }

              />

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

                className="btn btn-success w-100"

                onClick={handleSignup}

              >

                Sign Up

              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default SignupPage;