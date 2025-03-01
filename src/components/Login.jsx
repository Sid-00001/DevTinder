import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_BACKEND_URL } from "../utils/constants";


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const [emailId, setEmailId] = useState("sid@gmail.com");
  const [password, setPassword] = useState("Sidd@123");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
  
    try {
      const res = await axios.post(
        BASE_BACKEND_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/"); // Redirect only if login is successful
    } catch (err) {
      setError(err.response?.data?.error || "Login failed"); // Properly set the error message
    }
  };
  

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 text-primary-content w-96">
        <div className="card-body">
          <h2 className="card-title text-center">LOGIN</h2>
          <form onSubmit={handleLogin}>
            <div className="form-control w-full max-w-xs">
              {/* Email Input */}
              <label className="label">Email</label>
              <div className="input validator flex items-center outline-none border-transparent focus:ring-0">
                <svg
                  className="h-5 w-5 opacity-50 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  placeholder="mail@site.com"
                  required
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                  className="w-full p-2"
                />
              </div>

              {/* Password Input */}
              <label className="label mt-2">Password</label>
              <div className="input validator flex items-center outline-none border-transparent focus:ring-0">
                <svg
                  className="h-5 w-5 opacity-50 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                    <circle
                      cx="16.5"
                      cy="7.5"
                      r=".5"
                      fill="currentColor"
                    ></circle>
                  </g>
                </svg>
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2"
                  minLength="8"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                  title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                />
              </div>

              {/* Validation Error Message */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            {/* Submit Button */}
            <div className="card-actions justify-end mt-4">
              <button type="submit" className="btn btn-primary w-full">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
