import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import "./Registration.css";
import PasswordStrengthMeter from "./PasswordStrengthMeter";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

const Registration = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstname: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets are allowed")
      .required("First Name is required"),
    lastname: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Only alphabets and spaces are allowed")
      .required("Last Name is required"),
    username: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
    mobile: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
      .required("Invalid Mobile number"),
    otp: Yup.string().when("otpSent", {
      is: true,
      then: Yup.string().required("OTP is required"),
    }),
    role: Yup.string().required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      mobile: "",
      otp: "",
      role: "user",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!otpVerified) {
        formik.setFieldError("otp", "Please verify OTP before submitting.");
        return;
      }

      const user1 = {
        username: values.username,
        firstname: values.firstname,
        lastname: values.lastname,
        mobile: values.mobile,
        password: values.password,
        role: values.role,
      };

      try {
        const response = await axios.post(
          "http://localhost:6776/register",
          user1
        );
        console.log(response.data);

        // Success snackbar
        setSnackbar({
          open: true,
          message: "Registration successful! Redirecting to login...",
          severity: "success",
        });

        // Redirect to login after a successful registration
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error(error);
        if (error.response) {
          if (error.response.status === 409) {
            const message = error.response.data;
            if (message === "Email is already in use with another account") {
              setOtpSent(false);
              setOtpVerified(false);
              formik.setFieldError(
                "username",
                "Email is already registered. Please use a different email."
              );
            } else if (
              message === "Mobile number is already in use with another account"
            ) {
              formik.setFieldError(
                "mobile",
                "Mobile number is already registered. Please use a different number."
              );
            }
          } else {
            // Error snackbar
            setSnackbar({
              open: true,
              message: "Registration failed! Please try again.",
              severity: "error",
            });
          }
        }
      }
    },
  });

  const sendOtp = async () => {
    const email = formik.values.username;
    try {
      await axios.post("http://localhost:6776/send", { username: email });
      setOtpSent(true);
      setSnackbar({
        open: true,
        message: "OTP sent to your email.",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      setSnackbar({
        open: true,
        message: "Failed to send OTP.",
        severity: "error",
      });
    }
  };

  const verifyOtp = async () => {
    const email = formik.values.username;
    const otp = formik.values.otp;
    try {
      await axios.post("http://localhost:6776/verify", {
        username: email,
        otp,
      });
      setOtpVerified(true);
      formik.setFieldError("otp", null);
      setSnackbar({
        open: true,
        message: "OTP verified successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      formik.setFieldError("otp", "Invalid OTP or expired.");
      setSnackbar({
        open: true,
        message: "Invalid OTP or expired.",
        severity: "error",
      });
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    formik.setFieldValue("password", password);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length <= 3) return 1;
    else if (password.length <= 5) return 2;
    else if (password.length <= 7) strength = 3;
    else strength = 4;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    const lengthValid = password.length > 7;

    if (
      lengthValid &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    ) {
      strength = 4; // Strong
    }

    return strength;
  };

  return (
    <div className="registration">
      <form className="form-registration" onSubmit={formik.handleSubmit}>
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
            style={{ width: "5rem", height: "5rem", alignContent: "center" }}
          />
        </div>
        <div className="reg_main">
          <h2 className="Registerheading">Registration</h2>

          {/* First Name */}
          <label className="Registerlabels">
            First Name <span style={{ color: "#96271b" }}>*</span>
          </label>
          <input
            className="input-registration"
            name="firstname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstname}
          />
          {formik.errors.firstname && formik.touched.firstname && (
            <span className="mb-4 span-registration">
              {formik.errors.firstname}
            </span>
          )}

          {/* Last Name */}
          <label className="Registerlabels">
            Last Name <span style={{ color: "#96271b" }}>*</span>
          </label>
          <input
            className="input-registration"
            name="lastname"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastname}
          />
          {formik.errors.lastname && formik.touched.lastname && (
            <span className="span-registration">{formik.errors.lastname}</span>
          )}

          {/* Email */}
          <div className="input-container">
            <label className="Registerlabels">
              Email <span style={{ color: "#96271b" }}>*</span>
            </label>
            <input
              className="input-registration"
              name="username"
              onChange={formik.handleChange}
              onBlur={(e) => {
                formik.handleBlur(e);
                setOtpSent(false);
                setOtpVerified(false);
              }}
              value={formik.values.username}
            />
            {otpVerified && <FaCheckCircle className="check-icon" />}
          </div>
          {formik.errors.username && formik.touched.username && (
            <span className="span-registration">{formik.errors.username}</span>
          )}

          {/* OTP Section */}
          {!otpVerified && (
            <button
              type="button"
              className="button-registration"
              onClick={sendOtp}
            >
              Verify
            </button>
          )}

          {otpSent && !otpVerified && (
            <>
              <label className="Registerlabels">
                OTP <span style={{ color: "#96271b" }}>*</span>
              </label>
              <input
                className="input-registration"
                name="otp"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
              />
              <button
                type="button"
                className="button-registration"
                onClick={verifyOtp}
              >
                Verify OTP
              </button>
              {formik.errors.otp && formik.touched.otp && (
                <span className="span-registration">{formik.errors.otp}</span>
              )}
            </>
          )}

          {/* Password */}
          <label className="Registerlabels">
            Password <span style={{ color: "#96271b" }}>*</span>
          </label>
          <div style={{ position: "relative" }}>
            <input
              type={showPassword ? "text" : "password"}
              className="input-registration"
              name="password"
              onChange={handlePasswordChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            <span
              style={{
                position: "absolute",
                right: 10,
                top: "37%",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <PasswordStrengthMeter strength={passwordStrength} />

          {/* Mobile Number */}
          <label className="Registerlabels">
            Mobile Number <span style={{ color: "#96271b" }}>*</span>
          </label>
          <input
            className="input-registration"
            name="mobile"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.mobile}
          />
          {formik.errors.mobile && formik.touched.mobile && (
            <span className="span-registration">{formik.errors.mobile}</span>
          )}

          {/* Role Selection */}
          <label className="Registerlabels">
            Role <span style={{ color: "#96271b" }}>*</span>
          </label>
          <select
            className="select-registration"
            name="role"
            onChange={formik.handleChange}
            value={formik.values.role}
          >
            <option value="user">User</option>
            <option value="provider">Provider</option>
          </select>

          {/* Submit Button */}
          <button className="button-registration" type="submit">
            Register
          </button>
        </div>
      </form>

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Registration;
