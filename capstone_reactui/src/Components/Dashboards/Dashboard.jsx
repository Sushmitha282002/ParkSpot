import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ParkAreaCard from "./ParkAreaCard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ParkAreaCard.css";

const Dashboard = () => {
  const user = useSelector((state) => state.user.user);
  const jwttoken = user.token; // Token from regular login
  const loginType = user.loginType; // Assuming you track if user logged in via Google
  const [parkAreas, setParkAreas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const areasPerPage = 6;
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const fetchParkAreas = async () => {
      try {
        let url, config;

        // Check if the user logged in through Google or via regular login
        if (loginType === "google") {
          // Fetch from the non-authenticated endpoint
          url = "http://localhost:6778/parkareas/available";
          config = {}; // No token needed
        } else {
          // Fetch from the authenticated endpoint with JWT token
          url = "http://localhost:6776/a9";
          config = {
            headers: {
              Authorization: `Bearer ${jwttoken}`,
            },
          };
        }

        const response = await axios.get(url, config);
        setParkAreas(response.data);
      } catch (error) {
        console.error("Error fetching park areas:", error);
      }
    };

    fetchParkAreas();
  }, [jwttoken, loginType]);

  const handleBookNow = (area) => {
    navigate("/Vehicle", { state: { area } });
  };

  const handleBookingDetails = () => {
    navigate("/booking-details");
  };

  const handlePaymentDetails = () => {
    navigate("/payment-details");
  };

  const indexOfLastArea = currentPage * areasPerPage;
  const indexOfFirstArea = indexOfLastArea - areasPerPage;
  const currentAreas = parkAreas.slice(indexOfFirstArea, indexOfLastArea);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

  return (
    <div className="user-dashboard">
      <Header />

      <div
        className="bar-search-container"
        style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
      >
        <div
          className="bar"
          style={{
            marginRight: "20px",
            position: "relative",
            marginBottom: "80px",
          }}
        >
          <i
            className="fa-solid fa-bars"
            onClick={toggleDropdown}
            style={{ cursor: "pointer", fontSize: "24px" }}
          ></i>

          {dropdownOpen && (
            <div
              className="dropdown-menu"
              style={{
                position: "absolute",
                top: "50px",
                left: "0",
                background: "#fff",
                border: "1px solid #ccc",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                zIndex: 1000,
                padding: "10px",
                display: "block",
              }}
            >
              <button className="dropdown-item" onClick={handleBookingDetails}>
                Booking details
              </button>
              <button className="dropdown-item" onClick={handlePaymentDetails}>
                Payment details
              </button>
            </div>
          )}
        </div>

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

      <h1 style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        Available Park Areas
      </h1>

      {currentAreas.length > 0 ? (
        <div className="row full-width-row">
          {currentAreas.map((area) => (
            <div className="col-md-4" key={area.areaid}>
              <ParkAreaCard area={area} onBookNow={handleBookNow} />
            </div>
          ))}
        </div>
      ) : (
        <h5 style={{ textAlign: "center", color: "red" }}>
          No park areas available
        </h5>
      )}

      <nav>
        <ul className="pagination justify-content-center">
          {Array.from(
            { length: Math.ceil(parkAreas.length / areasPerPage) },
            (_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>

      <Footer />
    </div>
  );
};

export default Dashboard;
