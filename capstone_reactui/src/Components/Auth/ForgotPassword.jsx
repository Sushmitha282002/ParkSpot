import React, { useState } from "react";

import axios from "axios";

import yourimage from "../Pics/distcar1.png"; // Import the image

import "./ForgotPassword.css"; // Import the CSS

import {
  RESET_LINK_SENT,
  USER_NOT_FOUND,
  GENERIC_ERROR,
  FORGOT_PASSWORD_URL,
} from "../GlobalData/Constant"; // Import the constants

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      // Send the email to the backend to initiate the reset process

      const response = await axios.post(
        FORGOT_PASSWORD_URL,

        {
          username: email, // Sending the email entered by the user
        }
      );

      if (response.status === 200) {
        setMessage(RESET_LINK_SENT);

        setError(""); // Clear any previous errors
      }
    } catch (err) {
      // Handle the error if the email is not found or if there is any other issue

      if (err.response && err.response.status === 404) {
        setError(USER_NOT_FOUND);

        setMessage(""); // Clear the success message
      } else {
        setError(GENERIC_ERROR);

        setMessage(""); // Clear the success message
      }
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left side for the image */}
        <div className="col-md-6 p-0">
          <img
            src={yourimage}
            alt="Forgot Password"
            className="img-fluid h-100 w-100"
            style={{ objectFit: "contain" }} // Ensures the image covers the entire area
          />
        </div>

        {/* Right side for the form */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div
            className="bg-light shadow p-4"
            style={{ width: "80%", height: "auto" }}
          >
            <h4 className="mb-4">Forgot Password</h4>
            <form onSubmit={forgotPasswordHandler}>
              <div className="form-group mb-3">
                <label htmlFor="email">
                  Email <span style={{ color: "#96271b" }}>*</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="btn-light-green "
                  style={{ width: "100%" }}
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Display success or error messages */}

            {message && (
              <div className="alert alert-success mt-3">{message}</div>
            )}

            {error && <div className="alert alert-danger mt-3">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
