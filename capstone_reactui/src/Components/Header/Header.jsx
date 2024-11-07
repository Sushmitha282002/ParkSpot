import React, { useEffect, useState, useRef } from "react";

import { THEME_COLORS } from "../GlobalData/Constant.js";

import "./Header.css";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { clearUser } from "../../features/SushStore.js";

import im1 from "../Pics/logo.png";

function Header() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const roles = user.role;

  const isGoogleAuth = user?.loginType === "google";

  const isLoggedIn = !!user.token;

  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null); // Create a ref for the dropdown

  const handleLogout = () => {
    dispatch(clearUser());

    setShowForm(false); // Close the dropdown after logout

    navigate("/"); // Navigate to home after logout
  };

  // Click outside to close the dropdown

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false); // Close dropdown if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup the event listener
    };
  }, [formRef]);

  // Handle theme color changes

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--logo-color",

      THEME_COLORS.logo_color
    );

    document.documentElement.style.setProperty(
      "--background-color",

      THEME_COLORS.background_color
    );

    document.documentElement.style.setProperty(
      "--nav-background-color",

      THEME_COLORS.nav_background_color
    );

    document.documentElement.style.setProperty(
      "--text-color",

      THEME_COLORS.text_color
    );

    document.documentElement.style.setProperty(
      "--hover-background-color",

      THEME_COLORS.hover_background_color
    );
  }, []);

  // Log user data for debugging

  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  // Determine the correct home link based on user role

  const getHomeLink = () => {
    if (isGoogleAuth) return "/dashboard";

    if (!isLoggedIn) return "/";

    switch (roles) {
      case "user":
        return "/dashboard";

      case "admin":
        return "/dashboard1";

      case "provider":
        return "/dashboard2";

      default:
        return "/";
    }
  };

  // Check if the user logged in via Google

  const loggedInWithGoogle = user.loginType === "google"; // Assumes you have this property in your user state

  return (
    <header className="sticky-header">
      <nav
        className="navbar navbar-expand-lg navbar-light"
        style={{ backgroundColor: THEME_COLORS.nav_background_color }}
      >
        <div className="container-fluid">
          {/* Logo or Brand Name */}
          <div className="logo">
            <Link to="/">
              <img
                src="/Utils/image copy.png"
                alt="Logo"
                height="50px"
                width="100%"
              />
            </Link>
          </div>

          {/* Toggler button for mobile view */}

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={!isNavbarCollapsed}
            aria-label="Toggle navigation"
            onClick={() => setIsNavbarCollapsed(!isNavbarCollapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              !isNavbarCollapsed ? "show" : ""
            }`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={getHomeLink()} // Use the function here to determine the link
                  style={{ color: THEME_COLORS.text_color }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/about"
                  style={{ color: THEME_COLORS.text_color }}
                >
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/contactus"
                  style={{ color: THEME_COLORS.text_color }}
                >
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/faq"
                  style={{ color: THEME_COLORS.text_color }}
                >
                  FAQ
                </Link>
              </li>

              {/* Additional buttons for provider role */}

              {roles === "provider" && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/booking-details"
                      style={{ color: THEME_COLORS.text_color }}
                    >
                      Booking Details
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/payment-details"
                      style={{ color: THEME_COLORS.text_color }}
                    >
                      Payment Details
                    </Link>
                  </li>
                </>
              )}
            </ul>

            {loggedInWithGoogle ? ( // Check if logged in with Google first
              <button
                className="google_logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : isLoggedIn ? ( // If not Google login, check if logged in
              <div
                className="user-avatar-container"
                style={{ position: "relative" }}
              >
                <div
                  className="user-avatar"
                  onClick={() => setShowForm((prev) => !prev)}
                  style={{
                    color: "black",

                    cursor: "pointer",

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    width: "40px",

                    height: "40px",

                    borderRadius: "50%",

                    backgroundColor: THEME_COLORS.avatar_background,
                  }}
                >
                  {user.firstLetter}
                </div>

                {showForm && (
                  <div
                    ref={formRef} // Attach the ref here
                    style={{
                      position: "absolute",

                      top: "50px",

                      right: "0",

                      backgroundColor: "white",

                      padding: "15px",

                      borderRadius: "8px",

                      boxShadow: "0 4px 12px rgba(0,0,0,0.2)",

                      zIndex: "1000",

                      minWidth: "200px",
                    }}
                  >
                    <form>
                      <div style={{ marginBottom: "10px" }}>
                        <strong>FirstName:</strong> {user.firstname} <br />
                        <strong>LastName:</strong> {user.lastname} <br />
                        <strong>Email:</strong> {user.username} <br />
                      </div>
                      <hr style={{ margin: "10px 0" }} />
                      <button
                        type="button"
                        onClick={handleLogout}
                        style={{
                          width: "100%",

                          backgroundColor: "red",

                          color: "white",

                          padding: "10px",

                          borderRadius: "4px",

                          border: "none",

                          cursor: "pointer",
                        }}
                      >
                        Logout
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <form className="d-flex ms-2">
                <div className="nav_main_btn">
                  <Link to="/registration" className="signup_btn me-2">
                    Signup
                  </Link>
                  <Link to="/login" className="login_btn">
                    Login
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
