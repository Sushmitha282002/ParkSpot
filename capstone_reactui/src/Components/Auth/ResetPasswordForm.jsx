import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import { FaKey } from "react-icons/fa"; // Importing react icons

import PasswordStrengthMeter from "./PasswordStrengthMeter"; // Import the PasswordStrengthMeter component

import {
  EMAIL_VALIDATION_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_UPPERCASE_MESSAGE,
  PASSWORD_LOWERCASE_MESSAGE,
  PASSWORD_NUMBER_MESSAGE,
  PASSWORD_SPECIAL_CHAR_MESSAGE,
} from "../GlobalData/Constant";

const ResetPasswordForm = () => {
  const [message, setMessage] = useState("");

  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [passwordStrength, setPasswordStrength] = useState(null); // State for password strength

  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string()

      .matches(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/,

        EMAIL_VALIDATION_MESSAGE
      )

      .required(EMAIL_REQUIRED_MESSAGE),

    newPassword: Yup.string()

      .min(8, PASSWORD_MIN_LENGTH_MESSAGE)

      .matches(/[A-Z]/, PASSWORD_UPPERCASE_MESSAGE)

      .matches(/[a-z]/, PASSWORD_LOWERCASE_MESSAGE)

      .matches(/[0-9]/, PASSWORD_NUMBER_MESSAGE)

      .matches(
        /[@$!%*#?&]/,

        PASSWORD_SPECIAL_CHAR_MESSAGE
      )

      .required("New Password is required"),

    confirmPassword: Yup.string()

      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")

      .required("Confirm Password is required"),
  });

  const handlePasswordChange = (password) => {
    // If the password is empty, set the strength to 0 and return

    if (!password) {
      setPasswordStrength(0); // No strength to show

      return;
    }

    let strength = 0;

    // Check the length and other criteria

    const lengthValid = password.length >= 8;

    const hasUppercase = /[A-Z]/.test(password);

    const hasLowercase = /[a-z]/.test(password);

    const hasNumber = /[0-9]/.test(password);

    const hasSpecialChar = /[!@$%^&*?]/.test(password);

    // Determine strength based on character count and validity

    if (password.length <= 3) {
      strength = 1; // Very Weak
    } else if (password.length <= 5) {
      strength = 2; // Weak
    } else if (password.length <= 7) {
      strength = 3; // Moderate
    } else if (
      lengthValid &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      strength = 4; // Strong
    } else {
      strength = 3; // Moderate but not all criteria met
    }

    // Update the password strength

    setPasswordStrength(strength);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const { email, newPassword } = values;

    setSubmitting(true);

    try {
      const response = await axios.post("http://localhost:6776/resetPassword", {
        username: email,

        password: newPassword,
      });

      if (response.status === 200) {
        setMessage("Password reset successfully! Redirecting to login...");

        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage("Error resetting password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);

      if (error.response && error.response.status === 400) {
        setMessage("Invalid request. User not found.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",

        background: "white",
        padding: "0 15px",
      }}
    >
      <div className="row w-100">
        {/* Left Side - Image */}
        <div
          className="col-md-6 d-flex justify-content-center align-items-center mb-4 mb-md-0"
          style={{ padding: "15px" }}
        >
          <img
            src="/Utils/landing2.png"
            alt="Reset Illustration"
            className="img-fluid d-none d-md-block"
            style={{
              maxWidth: "100%",

              height: "auto",

              objectFit: "cover", // Ensures proper scaling of image
            }}
          />
        </div>

        {/* Right Side - Form */}
        <div className="col-md-6 d-flex align-items-center">
          <div className="w-100">
            <Formik
              initialValues={{
                email: "",

                newPassword: "",

                confirmPassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, setFieldValue }) => (
                <Form
                  style={{
                    backgroundColor: "#ffffff",

                    padding: "1rem",

                    borderRadius: "10px",

                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",

                    maxWidth: "100%",
                  }}
                >
                  <h2
                    className="mt-0 mb-4 text-center"
                    style={{ color: "black", paddingTop: "1rem" }} // Added paddingTop
                  >
                    <FaKey className="me-2" /> {/* Using react icon */}
                    Reset Your Password
                  </h2>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label"
                      style={{ color: "black" }}
                    >
                      Email <span style={{ color: "#96271b" }}>*</span>
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter your email"
                      className="form-control"
                      style={{
                        backgroundColor: "#fff", // White input background

                        borderColor: "black",

                        color: "black",

                        borderRadius: "25px",
                      }}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="newPassword"
                      className="form-label"
                      style={{ color: "black" }}
                    >
                      New Password <span style={{ color: "#96271b" }}>*</span>
                    </label>
                    <div className="input-group position-relative">
                      <Field
                        type={showNewPassword ? "text" : "password"}
                        id="newPassword"
                        name="newPassword"
                        placeholder="Enter new password"
                        className="form-control"
                        style={{
                          backgroundColor: "#fff", // White input background

                          borderColor: "black",

                          color: "black",

                          borderRadius: "25px",
                        }}
                        onChange={(e) => {
                          const { value } = e.target;

                          handlePasswordChange(value);

                          setFieldValue("newPassword", value);
                        }}
                      />
                      <span
                        className="input-group-text position-absolute"
                        style={{
                          right: "10px",

                          top: "39%",

                          transform: "translateY(-50%)",

                          cursor: "pointer",

                          border: "none",

                          background: "transparent",

                          color: "black",
                        }}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        <i
                          className={`bi ${
                            showNewPassword ? "bi-eye" : "bi-eye-slash"
                          }`}
                        ></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="newPassword"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <PasswordStrengthMeter strength={passwordStrength} />
                  <div className="mb-2">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label"
                      style={{ color: "black" }}
                    >
                      Confirm New Password{" "}
                      <span style={{ color: "#96271b" }}>*</span>
                    </label>
                    <div className="input-group position-relative">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        className="form-control"
                        style={{
                          backgroundColor: "#fff", // White input background

                          borderColor: "black",

                          color: "black",

                          borderRadius: "25px",
                        }}
                      />
                      <span
                        className="input-group-text position-absolute"
                        style={{
                          right: "10px",

                          top: "39%",

                          transform: "translateY(-50%)",

                          cursor: "pointer",

                          border: "none",

                          background: "transparent",

                          color: "black",
                        }}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <i
                          className={`bi ${
                            showConfirmPassword ? "bi-eye" : "bi-eye-slash"
                          }`}
                        ></i>
                      </span>
                    </div>
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn"
                    style={{
                      backgroundColor: "#26d2b0", // Button color

                      color: "black",

                      width: "100%",

                      borderRadius: "9px",
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Resetting..." : "Reset Password"}
                  </button>
                </Form>
              )}
            </Formik>

            {message && (
              <p className="mt-3 text-center text-success">{message}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
