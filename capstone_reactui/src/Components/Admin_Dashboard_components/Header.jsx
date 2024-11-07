import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../features/SushStore.js";
import axios from "axios";
import { BsFillBellFill, BsPersonCircle, BsJustify } from "react-icons/bs";
import "./Admincss.css";
import {
  PENDING_COUNT_URL,
  NOTIFICATION_URL,
  SIGNUP_URL,
  LOGIN_URL1,
  LOGOUT_BUTTON_TEXT,
  SIGNUP_BUTTON_TEXT,
  LOGIN_BUTTON_TEXT,
  AVATAR_BACKGROUND_COLOR,
  NOTIFICATION_ICON_COLOR,
  NOTIFICATION_BADGE_COLOR,
  NOTIFICATION_BADGE_TEXT_COLOR,
  NOTIFICATION_BADGE_FONT_SIZE,
  NOTIFICATION_BADGE_PADDING,
  NOTIFICATION_BADGE_POSITION_TOP,
  NOTIFICATION_BADGE_POSITION_RIGHT,
  FORM_BACKGROUND_COLOR,
  FORM_PADDING,
  FORM_BORDER_RADIUS,
  FORM_BOX_SHADOW,
  FORM_Z_INDEX,
  FORM_MIN_WIDTH,
  FORM_BUTTON_BACKGROUND_COLOR,
  FORM_BUTTON_TEXT_COLOR,
  FORM_BUTTON_PADDING,
  FORM_BUTTON_BORDER_RADIUS,
  FORM_BUTTON_BORDER,
  FORM_BUTTON_CURSOR,
} from "../GlobalData/Constant.js"; // Import the constants

function Header({ OpenSidebar }) {
  const [pendingCount, setPendingCount] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const isLoggedIn = !!user?.token;
  const formRef = useRef(null);
  const jwttoken = user.token;

  const handleLogout = () => {
    dispatch(clearUser());
    setShowForm(false); // Close the dropdown after logout
    navigate("/");
  };

  const handleAvatarClick = () => {
    if (isLoggedIn) {
      setShowForm((prev) => !prev); // Toggle form visibility
    }
  };

  // Close the form if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {//event listener
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false); // Close form if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formRef]);

  // Fetch count of pending park areas
  const fetchPendingCount = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwttoken}`, // Include the JWT token here
        },
      };
      const response = await axios.get(PENDING_COUNT_URL, config);
      setPendingCount(response.data); // Assuming the response is a number
    } catch (error) {
      console.error("Error fetching pending count:", error);
    }
  };

  // Fetch pending count on component mount
  useEffect(() => {
    fetchPendingCount();
  }, []);

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-right">
        <div className="notification-icon">
          <Link to={NOTIFICATION_URL}>
            <div style={{ position: "relative", display: "inline-block" }}>
              <BsFillBellFill
                className="icon"
                style={{
                  fontSize: "24px",
                  marginRight: "25px",
                  color: NOTIFICATION_ICON_COLOR,
                }}
              />
              {pendingCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: NOTIFICATION_BADGE_POSITION_TOP,
                    right: NOTIFICATION_BADGE_POSITION_RIGHT,
                    backgroundColor: NOTIFICATION_BADGE_COLOR,
                    borderRadius: "50%",
                    color: NOTIFICATION_BADGE_TEXT_COLOR,
                    padding: NOTIFICATION_BADGE_PADDING,
                    fontSize: NOTIFICATION_BADGE_FONT_SIZE,
                    marginRight: "24px",
                  }}
                >
                  {pendingCount}
                </span>
              )}
            </div>
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="user-avatar-container" style={{ marginLeft: "5px" }}>
            <div
              className="user-avatar"
              onClick={handleAvatarClick}
              style={{
                color: "white",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: AVATAR_BACKGROUND_COLOR,
              }}
            >
              {user.firstLetter}
            </div>
            {showForm && (
              <div
                ref={formRef}
                style={{
                  position: "absolute",
                  top: "50px",
                  right: "0",
                  backgroundColor: FORM_BACKGROUND_COLOR,
                  padding: FORM_PADDING,
                  borderRadius: FORM_BORDER_RADIUS,
                  boxShadow: FORM_BOX_SHADOW,
                  zIndex: FORM_Z_INDEX,
                  minWidth: FORM_MIN_WIDTH,
                }}
              >
                <form>
                  <div style={{ marginBottom: "10px" }}>
                    <strong>First Name:</strong> {user.firstname} <br />
                    <strong>Last Name:</strong> {user.lastname} <br />
                    <strong>Email:</strong> {user.username} <br />
                  </div>
                  <hr style={{ margin: "10px 0" }} />
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      backgroundColor: FORM_BUTTON_BACKGROUND_COLOR,
                      color: FORM_BUTTON_TEXT_COLOR,
                      padding: FORM_BUTTON_PADDING,
                      borderRadius: FORM_BUTTON_BORDER_RADIUS,
                      border: FORM_BUTTON_BORDER,
                      cursor: FORM_BUTTON_CURSOR,
                    }}
                  >
                    {LOGOUT_BUTTON_TEXT}
                  </button>
                </form>
              </div>
            )}
          </div>
        ) : (
          <form className="d-flex ms-2">
            <div className="nav_main_btn">
              <Link to={SIGNUP_URL} className="signup_btn me-2">
                {SIGNUP_BUTTON_TEXT}
              </Link>
              <Link to={LOGIN_URL1} className="login_btn">
                {LOGIN_BUTTON_TEXT}
              </Link>
            </div>
          </form>
        )}
      </div>
    </header>
  );
}

export default Header;
