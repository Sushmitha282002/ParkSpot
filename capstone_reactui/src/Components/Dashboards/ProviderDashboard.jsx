import React, { useState, useRef, useEffect } from "react";

import AOS from "aos";

import "aos/dist/aos.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";

import { setAgreement } from "../../features/SushStore"; // Import the action

import "./ProviderDashboard copy.css";

import backgroundImage from "../Pics/background.jpg";

import Header from "../Header/Header";

import Footer from "../Footer/Footer";

import { FaCar, FaMapMarkerAlt } from "react-icons/fa";

import imagex from "../Pics/registerimage.png";

import axios from "axios";

import { useNavigate } from "react-router-dom";

const ProviderDashboard = () => {
  const [showRules, setShowRules] = useState(false);

  const [showNameInput, setShowNameInput] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedIcon, setSelectedIcon] = useState("car"); // Set default to 'car'

  const nameInputRef = useRef(null);

  const dispatch = useDispatch();

  const [suggestions, setSuggestions] = useState([]);

  const [parkAreas, setParkAreas] = useState([]);

  const [agreed, setAgreed] = useState(false);

  const isAgreed = useSelector((state) => state.user.user.agreed);

  const [areaName, setAreaName] = useState("");

  const [areaLocation, setAreaLocation] = useState("");

  const [totalSlots, setTotalSlots] = useState("");

  const [touched, setTouched] = useState(false);

  const [image, setImage] = useState(null); // Initialize image state

  const user = useSelector((state) => state.user.user);

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  // const providerid = useSelector((state) => state.user.user.id);

  useEffect(() => {
    AOS.init(); // Initialize AOS

    setAgreed(isAgreed);
  }, [isAgreed]);

  useEffect(() => {
    const fetchParkAreas = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const response = await axios.get("http://localhost:6776/a9", config);

        setParkAreas(response.data);
      } catch (error) {
        console.error("Error fetching park areas:", error);
      }
    };

    fetchParkAreas();
  }, []);

  const handleLearnMoreClick = () => {
    setShowRules(true);
  };

  const handleCloseRules = () => {
    setShowRules(false);
  };

  const handleCheckboxChange = () => {
    setAgreed((prev) => !prev);
  };

  const handleAgree = (e) => {
    e.preventDefault();

    if (agreed) {
      toast.success("You have agreed to the rules.");

      dispatch(setAgreement(true));

      handleCloseRules();

      setShowNameInput(true);
    } else {
      toast.error("Please agree to the rules before proceeding.");
    }
  };

  const handleGetStarted = () => {
    if (isAgreed) {
      setShowNameInput(true);

      setTimeout(() => {
        nameInputRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } else {
      toast.error(
        "You have to learn more about being a spot owner before starting."
      );

      setShowRules(true);
    }
  };

  // Handler for file input change

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file from input

    if (file) {
      setImage(file); // Set the file to the state

      console.log("File selected:", file); // Log file for debugging
    } else {
      console.log("No file selected.");
    }
  };
  const handleBlur = (field) => {
    if (!field.value) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.name]: `${field.name} is required`,
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field.name]: "",
      }));
    }
  };

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);

    // If the car icon is clicked, show the search bar

    if (icon === "car") {
      setSearchTerm(""); // Reset the search term if needed
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    if (value) {
      const filteredAreas = parkAreas

        .filter((area) =>
          area.areaname.toLowerCase().includes(value.toLowerCase())
        )

        .reduce((unique, area) => {
          if (!unique.some((a) => a.areaname === area.areaname)) {
            unique.push(area);
          }

          return unique;
        }, []);

      setSuggestions(filteredAreas);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (area) => {
    setSearchTerm(area.areaname);

    setSuggestions([]);

    navigate(`/search`, { state: { areaname: area.areaname } });
  };

  console.log(user.token);

  let jwttoken = user.token;

  const handleSpotRegisterSubmit = async (e) => {
    e.preventDefault();

    console.log("Image state before submission:", image); // Log image state

    // If image is undefined, prevent submission and log error

    if (!image) {
      console.error("Image is still undefined during submit");

      return;
    }

    // Create form data to send

    const formData = new FormData();

    formData.append("areaname", areaName);

    formData.append("arealocation", areaLocation);

    formData.append("totalslots", totalSlots);

    formData.append("image", image); // Append the image file to FormData

    formData.append("providerid", user.id); // Append provider id from user state

    // Debugging: Log FormData entries

    for (const pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    try {
      const response = await axios.post(
        "http://localhost:6778/parkareas/create",

        formData,

        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      toast.success("Uploaded area successfully!");
    } catch (error) {
      console.error(
        "Error uploading area:",

        error.response?.data || error.message
      );

      toast.error(
        "Error uploading area: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="provider-dashboard-main">
      <Header />
      <div
        className="provider-dashboard-container"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="overlay">
          <h2 style={{ color: "white", zIndex: 10, marginBottom: "520px" }}>
            An Easy Way to Earn Extra Income!
          </h2>

          {!showRules ? (
            <div className="content-box">
              <div
                className="icon-container"
                style={{
                  display: "flex",

                  justifyContent: "center",

                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",

                    marginRight: "50px",
                  }}
                >
                  <FaCar
                    size={24}
                    style={{
                      color: "black",

                      cursor: "pointer",

                      marginRight: "270px",
                    }}
                    onClick={() => handleIconClick("car")}
                  />
                  <p
                    style={{
                      color: "black",

                      marginTop: "5px",

                      marginRight: "270px",
                    }}
                  >
                    Find Spot
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",

                    flexDirection: "column",

                    alignItems: "center",
                  }}
                >
                  <FaMapMarkerAlt
                    size={24}
                    style={{ color: "black", cursor: "pointer" }}
                    onClick={() => handleIconClick("location")}
                  />
                  <p style={{ color: "black", marginTop: "5px" }}>Rent Spot</p>
                </div>
              </div>
              <hr style={{ marginTop: "0" }} />

              {selectedIcon === "location" && (
                <div data-aos="fade-left">
                  <h1 style={{ color: "black" }}>
                    Make money by renting out your spot
                  </h1>
                  <p style={{ color: "black" }}>
                    Start earning money by listing your spot on our platform.
                  </p>
                  <button
                    className="get-started-btn"
                    onClick={handleGetStarted}
                  >
                    Get started
                  </button>
                  <br />
                  <a
                    href="#"
                    className="learn-more-link"
                    onClick={handleLearnMoreClick}
                  >
                    Learn more about being a spot owner.
                  </a>
                </div>
              )}

              {/* Always show search bar for 'car' */}

              {selectedIcon === "car" && (
                <div data-aos="fade-right">
                  <h1 style={{ color: "black" }}>
                    Search parking spots in seconds
                  </h1>
                  <div
                    className="search-container"
                    style={{ flexGrow: 1, position: "relative" }}
                  >
                    <i className="fas fa-search search-icon"></i>
                    <input
                      type="text"
                      className="search-input"
                      style={{ borderRadius: "25px", width: "100%" }}
                      value={searchTerm}
                      onChange={handleSearchInput}
                      placeholder="Search park areas..."
                    />

                    {suggestions.length > 0 ? (
                      <ul
                        className="suggestions-list"
                        style={{
                          position: "absolute",

                          top: "40px",

                          width: "100%",

                          backgroundColor: "#fff",

                          zIndex: 1000,
                        }}
                      >
                        {suggestions.map((area) => (
                          <li
                            key={area.areaid}
                            className="suggestion-item"
                            onClick={() => handleSuggestionClick(area)}
                            style={{
                              cursor: "pointer",

                              padding: "10px 5px",

                              borderBottom: "1px solid #ccc",

                              display: "flex",

                              alignItems: "center",
                            }}
                          >
                            <i
                              className="fas fa-arrow-right"
                              style={{ marginRight: "10px" }}
                            ></i>

                            {area.areaname}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      searchTerm && (
                        <div
                          style={{
                            position: "absolute",

                            top: "40px",

                            width: "100%",

                            backgroundColor: "#fff",

                            zIndex: 1000,

                            padding: "10px",

                            border: "1px solid #ccc",

                            textAlign: "center",
                          }}
                        >
                          No results found
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="rules-panel active">
              <button
                className="close-btn"
                style={{ color: "black" }}
                onClick={handleCloseRules}
              >
                X
              </button>
              <h2>Terms and Conditions</h2>
              <ol className="rules-list" style={{ textAlign: "justify" }}>
                <li>
                  The slot provider agrees to make the parking slot available
                  for a minimum duration of one year.
                </li>
                <li>
                  This agreement may be renewed for additional terms upon mutual
                  written consent of both parties.
                </li>
                <li>
                  The fees for the services provided under this agreement shall
                  be monthly.
                </li>
                <li>
                  Payments shall be made on or before the 1st of each month.
                </li>
                <li>
                  The slot provider shall ensure that the parking slots are
                  available and in good condition for use.
                </li>
                <li>
                  The slot provider agrees to comply with all applicable laws
                  and regulations related to the parking slots.
                </li>
                <li>
                  Either party may terminate this agreement with a notice period
                  of 30 days written notice to the other party after the minimum
                  commitment of one year.
                </li>
              </ol>
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={handleCheckboxChange}
                />
                <label>I agree to the above rules and regulations.</label>
              </div>
              <button className="agree-btn" onClick={handleAgree}>
                Agree
              </button>
            </div>
          )}
        </div>
      </div>

      {showNameInput && (
        <div
          className="container name-input-container"
          ref={nameInputRef}
          style={{ padding: "50px 0" }}
        >
          <div className="row align-items-center justify-content-between">
            <div className="col-md-5 image-wrapper text-center">
              <img
                src={imagex}
                alt="Spot Image"
                className="img-fluid"
                style={{
                  maxWidth: "100%",

                  height: "auto",

                  marginRight: "200px",
                }}
              />
            </div>

            <div className="col-md-6 form-content">
              <h2 className="mb-4">Spot Register</h2>
              <form
                className="spot-register-form"
                onSubmit={handleSpotRegisterSubmit}
                encType="multipart/form-data"
              >
                <div className="form-group mb-3">
                  <label>
                    Area Name <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    name="Area Name"
                    placeholder="Enter Your Area Name"
                    className="form-control"
                    onBlur={(e) => handleBlur(e.target)}
                    required
                  />
                  {errors["Area Name"] && (
                    <span style={{ color: "red", fontSize: "12px" }}>
                      {errors["Area Name"]}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>
                    Area Location <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={areaLocation}
                    onChange={(e) => setAreaLocation(e.target.value)}
                    name="Area Location"
                    placeholder="Enter Your Area Location"
                    className="form-control"
                    onBlur={(e) => handleBlur(e.target)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label>
                    Total Slots <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="number"
                    value={totalSlots}
                    onChange={(e) => {
                      setTotalSlots(e.target.value); // Update the value on change

                      setTouched(true); // Mark input as touched when the user types
                    }}
                    onBlur={() => setTouched(true)} // Mark input as touched when the user leaves the field
                    name="totalSlots"
                    placeholder="Enter Total Slots"
                    className={`form-control ${
                      touched && totalSlots <= 0 ? "is-invalid" : ""
                    }`} // Add invalid class only if touched and value is invalid
                    required
                  />

                  {touched && totalSlots <= 0 && (
                    <small className="text-danger">
                      Please enter a valid number greater than 0
                    </small>
                  )}
                </div>

                <div className="form-group mb-3">
                  <label>
                    Upload Image <span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                    onChange={handleFileChange}
                    onBlur={(e) => handleBlur(e.target)}
                    name="Upload Image"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-simp"
                  style={{ width: "100%" }}
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default ProviderDashboard;
