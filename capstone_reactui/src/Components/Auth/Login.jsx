import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";

import axios from "axios";

import { useDispatch } from "react-redux";

import { setUser } from "../../features/SushStore"; // Adjust the import path as needed

import { FcGoogle } from "react-icons/fc";

import { FaEye, FaEyeSlash } from "react-icons/fa"; // Eye icons

import "./Login.css";

import {
  LOGIN_URL,
  GOOGLE_LOGIN_URL,
  LOGIN_HANDLELOGIN_FAILURE,
  LOGIN_HANDLELOGIN_ERROR,
  EMAIL_VALIDATION_MESSAGE,
  EMAIL_REQUIRED_MESSAGE,
  PASSWORD_REQUIRED_MESSAGE,
  PASSWORD_MIN_LENGTH_MESSAGE,
  PASSWORD_UPPERCASE_MESSAGE,
  PASSWORD_LOWERCASE_MESSAGE,
  PASSWORD_NUMBER_MESSAGE,
  PASSWORD_SPECIAL_CHAR_MESSAGE,
} from "../GlobalData/Constant"; // Import the constants

const validationSchema = Yup.object().shape({
  username: Yup.string()

    .matches(
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com)$/i,

      EMAIL_VALIDATION_MESSAGE
    )

    .required(EMAIL_REQUIRED_MESSAGE),

  password: Yup.string()

    .required(PASSWORD_REQUIRED_MESSAGE)

    .min(8, PASSWORD_MIN_LENGTH_MESSAGE)

    .matches(/[A-Z]/, PASSWORD_UPPERCASE_MESSAGE)

    .matches(/[a-z]/, PASSWORD_LOWERCASE_MESSAGE)

    .matches(/[0-9]/, PASSWORD_NUMBER_MESSAGE)

    .matches(/[$@%*?&]/, PASSWORD_SPECIAL_CHAR_MESSAGE),
});

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(LOGIN_URL, {
        username: values.username,

        password: values.password,
      });

      if (response.status === 200) {
        const { id, token, refreshToken, role, firstname, lastname } =
          response.data;

        const userData = {
          id,

          token,

          refreshToken,

          role,

          username: values.username,

          firstLetter: firstname.charAt(0).toUpperCase(),

          firstname,

          lastname,

          loginType: "regular",
        };

        dispatch(setUser(userData));

        if (role === "admin") {
          navigate("/dashboard1");
        } else if (role === "provider") {
          navigate("/dashboard2");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(LOGIN_HANDLELOGIN_FAILURE);
      }
    } catch (err) {
      setError(
        err.response && err.response.status === 401
          ? LOGIN_HANDLELOGIN_FAILURE
          : LOGIN_HANDLELOGIN_ERROR
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleLogin = () => {
    dispatch(setUser({ loginType: "google" }));

    window.location.href = GOOGLE_LOGIN_URL;
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-card glassmorphism shadow p-4">
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div
                  style={{
                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",
                  }}
                >
                  <img
                    src="../Utils/image copy.png"
                    alt="logo"
                    style={{
                      width: "5rem",

                      height: "5rem",

                      alignContent: "center",
                    }}
                  />
                </div>
                <h4 className="loginheading">Login</h4>
                <div className="form-group mb-3">
                  <label className="loginlabel" htmlFor="username">
                    Email <span style={{ color: "#96271b" }}>*</span>
                  </label>
                  <Field type="text" className="form-control" name="username" />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>
                <div className="form-group mb-3 password-field-container ">
                  <label className="loginlabel" htmlFor="password">
                    Password <span style={{ color: "#96271b" }}>*</span>
                  </label>
                  <div className="password-input-wrapper">
                    <Field
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      name="password"
                    />
                    <button
                      type="button"
                      className="eye-button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      onMouseEnter={(e) =>
                        (e.target.style.backgroundColor =
                          "rgba(255, 255, 255, 0.25)")
                      }
                      onMouseLeave={(e) =>
                        (e.target.style.backgroundColor = "")
                      }
                    >
                      {showPassword ? (
                        <FaEye className="eye-icon" />
                      ) : (
                        <FaEyeSlash className="eye-icon" />
                      )}
                    </button>
                  </div>

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="alert alert-danger"
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}
                <div className="d-grid">
                  <button
                    className="btn-login"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <div className="text-center mt-3">
            <button className="btn-link" onClick={handleGoogleLogin}>
              <FcGoogle /> Sign in with Google
            </button>
            <div className="link-separator" />
            <Link className="btn-link" to="/forgotPassword">
              Forgot Password?
            </Link>
            <div className="link-separator" />
            <Link className="btn-link" to="/registration">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
