import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import "./Vehicle.css";

import Header from "../Header/Header";

import Footer from "../Footer/Footer";

function Vehicle() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);

  const jwttoken = user.token;

  const [vehicleNumber, setVehicleNumber] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");

  const [errors, setErrors] = useState({});

  // Function to convert 12-hour format to 24-hour format
  const convertTo24HourFormat = (time) => {
    let [timePart, modifier] = time.split(" ");
    let [hours, minutes, seconds] = timePart.split(":");

    if (modifier === "AM" && hours === "12") {
      hours = "00"; // 12 AM case
    } else if (modifier === "PM" && hours !== "12") {
      hours = parseInt(hours, 10) + 12; // Convert PM times
    }

    return `${hours}:${minutes}:${seconds}`;
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure areaId and userId are set
    const areaId = user.areaid;
    const userId = user.id;

    // Convert checkInTime to 24-hour format
    const formattedCheckInTime = convertTo24HourFormat(checkInTime);
    const checkInDateTime = `${checkInDate}T${formattedCheckInTime}`;

    const payload = {
      userId: userId,
      areaId: areaId,
      checkInDate: checkInDate,
      checkInTime: checkInDateTime,
      vehicle: {
        vehicleNumber: vehicleNumber,
        vehicleType: vehicleType,
        vehicleModel: vehicleModel,
      },
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      };

      const response = await axios.post(
        "http://localhost:6776/a10",
        payload,
        config
      );

      console.log(response.data);

      toast.success(
        "Booking successfully created! Check your email for details."
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error during booking:", error.message);

      toast.error("Error creating booking. Please try again.");
    }
  };

  return (
    <div>
      <Header />
      <div className="vehicle-container">
        <h2>Enter Vehicle Details</h2>
        <form className="vehicle-form" onSubmit={handleSubmit}>
          <div className="vehicle-number">
            <label htmlFor="vehicleNumber">
              Vehicle Number <span style={{ color: "#96271b" }}>*</span>
            </label>
            <input
              type="text"
              id="vehicleNumber"
              name="Vehicle Number"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value)}
              onBlur={(e) => handleBlur(e.target)}
              required
            />
            {errors["Vehicle Number"] && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors["Vehicle Number"]}
              </span>
            )}
          </div>
          <div className="vehicle-type">
            <label htmlFor="vehicleType">
              Vehicle Type <span style={{ color: "#96271b" }}>*</span>
            </label>
            <input
              type="text"
              id="vehicleType"
              name="Vehicle Type"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              onBlur={(e) => handleBlur(e.target)}
              required
            />
            {errors["Vehicle Type"] && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors["Vehicle Type"]}
              </span>
            )}
          </div>
          <div className="vehicle-model">
            <label htmlFor="vehicleModel">
              Vehicle Model <span style={{ color: "#96271b" }}>*</span>
            </label>
            <input
              type="text"
              id="vehicleModel"
              name="Vehicle Model"
              value={vehicleModel}
              onChange={(e) => setVehicleModel(e.target.value)}
              onBlur={(e) => handleBlur(e.target)}
              required
            />
            {errors["Vehicle Model"] && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors["Vehicle Model"]}
              </span>
            )}
          </div>

          {/* Date picker for Check-in Date */}
          <div className="check-in-date">
            <label htmlFor="checkInDate">
              Check-in Date <span style={{ color: "#96271b" }}>*</span>
            </label>
            <input
              type="date"
              id="checkInDate"
              name="Check-in Date"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              onBlur={(e) => handleBlur(e.target)}
              required
              min={new Date().toISOString().split("T")[0]} // Corrected date validation
            />
            {errors["Check-in Date"] && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors["Check-in Date"]}
              </span>
            )}
          </div>

          {/* Time picker for Check-in Time (12-hour with AM/PM) */}
          <div className="check-in-time">
            <label htmlFor="checkInTime">
              Check-in Time (HH:MM:SS AM/PM){" "}
              <span style={{ color: "#96271b" }}>*</span>
            </label>
            <input
              type="text"
              id="checkInTime"
              name="Check-in Time"
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              onBlur={(e) => handleBlur(e.target)}
              required
              placeholder="HH:MM:SS AM/PM"
            />
            <small>
              Enter time in HH:MM:SS AM/PM format (e.g., 02:30:00 PM)
            </small>
            {errors["Check-in Time"] && (
              <span style={{ color: "red", fontSize: "12px" }}>
                {errors["Check-in Time"]}
              </span>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
          pauseOnFocusLoss
        />
      </div>
      <Footer />
    </div>
  );
}

export default Vehicle;
