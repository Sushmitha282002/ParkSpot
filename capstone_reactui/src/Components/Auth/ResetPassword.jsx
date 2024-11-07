import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import necessary hooks
import axios from "axios";

import {
  RESET_PASSWORD_URL,
  RESET_PASSWORD_HEADER,
  RESET_PASSWORD_TITLE,
  RESET_PASSWORD_DESCRIPTION,
  TOKEN_EXPIRED_OR_INVALID,
  RESET_PASSWORD_PROMPT,
  STRONG_PASSWORD_ADVICE,
  STRONG_PASSWORD_DESCRIPTION,
  LOADING_MESSAGE,
  INVALID_OR_EXPIRED_TOKEN_ALERT,
} from "../GlobalData/Constant"; // Import the constants

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from URL params
  const navigate = useNavigate();
  const [isTokenValid, setIsTokenValid] = useState(null); // Use null for loading state

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get(`${RESET_PASSWORD_URL}/${token}`);
        setIsTokenValid(true); // Token is valid
      } catch (error) {
        setIsTokenValid(false); // Token is expired or invalid
      }
    };

    validateToken();
  }, [token]);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (isTokenValid) {
      navigate(`/resetPasswordForm/${token}`); // Navigate to the reset password form
    } else {
      alert(INVALID_OR_EXPIRED_TOKEN_ALERT); // Alert user if the token is invalid
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div className="bg-dark text-white text-center p-4">
        <h1 style={{ fontFamily: "cursive", color: "#26d2b0" }}>
          {RESET_PASSWORD_HEADER}
        </h1>
      </div>

      {/* Main Content Section */}
      <div className="container text-center mt-4">
        <div className="bg-light p-4">
          <i className="bi bi-lock" style={{ fontSize: "2rem" }}></i>
          <h2 className="text-dark">{RESET_PASSWORD_TITLE}</h2>
          <p>{RESET_PASSWORD_DESCRIPTION}</p>
        </div>

        {/* Strong Password Section */}
        <div className="bg-white mt-4 p-4 border">
          <h5 style={{ fontWeight: "bold" }}>{STRONG_PASSWORD_ADVICE}</h5>
          <hr />
          <p>{STRONG_PASSWORD_DESCRIPTION}</p>

          {/* Conditional Rendering based on token validity */}
          {isTokenValid === null ? ( // Loading state
            <p>{LOADING_MESSAGE}</p>
          ) : isTokenValid ? (
            <button
              className="btn btn-lg"
              style={{ backgroundColor: "#26d2b0", width: "40%" }}
              onClick={handleResetPassword}
            >
              {RESET_PASSWORD_PROMPT}
            </button>
          ) : (
            <h2 style={{ color: "red" }}>{TOKEN_EXPIRED_OR_INVALID}</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
