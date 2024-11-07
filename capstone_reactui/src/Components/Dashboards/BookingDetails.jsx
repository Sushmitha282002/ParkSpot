import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./BookingDetails.css";
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

function BookingDetails() {
  const user = useSelector((state) => state.user.user);
  const [bookingDetails, setBookingDetails] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const userId = user.id;
  const jwttoken = user.token;
  const navigate = useNavigate();

  const showMessage = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };
        const response = await axios.get(
          `http://localhost:6776/${userId}/a13`,
          config
        );
        setBookingDetails(response.data);
      } catch (error) {
        showMessage("Error fetching booking details", "error");
        console.error("Error fetching booking details:", error);
      }
    };
    fetchBookingDetails();
  }, [userId]);

  const handleTokenChange = (e, index) => {
    const newDetails = [...bookingDetails];
    newDetails[index].tokenPass = e.target.value;
    setBookingDetails(newDetails);
  };

  const verifyOTP = async (booking, index) => {
    const { tokenPass, bookingId } = booking;
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      };
      const response = await axios.post(
        "http://localhost:6776/a11",
        {
          otp: tokenPass,
          bookingId: bookingId,
        },
        config
      );

      if (response.status === 200) {
        const updatedDetails = [...bookingDetails];
        updatedDetails[index].status = "CHECKED_OUT";
        updatedDetails[index].totalPrice = response.data.totalPrice;

        setBookingDetails(updatedDetails);
        showMessage("OTP verified successfully!", "success");
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      showMessage(error.response?.data || "Failed to verify OTP.", "error");
    }
  };

  const handleCancel = async (bookingId, index) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      };
      const cancelRequest = {
        bookingId: bookingId,
        userId: userId,
      };
      await axios.post("http://localhost:6776/a12", cancelRequest, config);

      const updatedDetails = [...bookingDetails];
      updatedDetails[index].status = "CANCELLED";
      setBookingDetails(updatedDetails);

      showMessage(`Booking ID ${bookingId} canceled successfully!`, "success");
    } catch (error) {
      console.error("Error canceling booking:", error);
      showMessage("Error canceling booking.", "error");
    }
  };

  const handlePayNow = async (bookingId, index) => {
    const booking = bookingDetails[index];

    if (!booking.tokenPass) {
      showMessage("Please enter the OTP to proceed.", "warning");
      return;
    }

    if (!window.Razorpay) {
      showMessage("Razorpay SDK not loaded. Please try again later.", "error");
      return;
    }

    const options = {
      key: "rzp_test_vv1FCZvuDRF6lQ", // Replace this with your Razorpay test key
      amount: parseInt(booking.totalPrice) * 100, // Amount in paise
      currency: "INR",
      name: "ParkSpot.com",
      description: "Booking Payment",

      theme: {
        color: "#edd607",
      },
      handler: async function (response) {
        const paymentData = {
          paymentId: response.razorpay_payment_id,
          bookingId: bookingId,
          userId: user.id,
        };

        try {
          let config = {
            headers: {
              Authorization: `Bearer ${jwttoken}`,
            },
          };
          await axios.post("http://localhost:6776/a14", paymentData, config);
          navigate("/paymentsuccess");
        } catch (error) {
          console.error("Error updating payment details:", error);
          showMessage(
            "Failed to update payment details. Please try again.",
            "error"
          );
        }
      },
    };

    var pay = new window.Razorpay(options);
    pay.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      showMessage("Payment failed. Please try again.", "error");
    });

    pay.open();
  };

  return (
    <div>
      <Header />
      <div className="booking-details-container">
        <div className="booking-details-content">
          <table className="booking-details-table">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Vehicle Number</th>
                <th>Check-in Date</th>
                <th>Status</th>
                <th>Area ID</th>
                <th>Slot Number</th>
                <th>Total Price</th>
                <th>Token Pass (OTP)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookingDetails.length > 0 ? (
                bookingDetails.map((booking, index) => (
                  <tr key={booking.bookingId}>
                    <td>{booking.bookingId}</td>
                    <td>{booking.vehicleNumber}</td>
                    <td>{booking.checkInDate}</td>
                    <td>{booking.status}</td>
                    <td>{booking.areaId}</td>
                    <td>{booking.slotNumber}</td>
                    <td>₹{booking.totalPrice}</td>
                    <td>
                      {booking.status === "CHECKED_OUT" ? (
                        <i
                          className="fa fa-check"
                          style={{
                            color: "green",
                            fontSize: "20px",
                            marginTop: "20px",
                          }}
                        ></i>
                      ) : booking.status === "CANCELLED" ? (
                        <i
                          className="fa fa-times"
                          style={{
                            color: "red",
                            fontSize: "20px",
                            marginTop: "20px",
                          }}
                        ></i>
                      ) : (
                        <>
                          <input
                            type="text"
                            value={booking.tokenPass || ""}
                            onChange={(e) => handleTokenChange(e, index)}
                            placeholder="Enter OTP"
                            className="token-input"
                          />
                          <br />
                          <button
                            className={`verify-button ${
                              booking.status === "CANCELLED"
                                ? "disabled-button"
                                : ""
                            }`}
                            style={{ marginTop: "20px" }}
                            onClick={() => verifyOTP(booking, index)}
                            disabled={booking.status === "CANCELLED"}
                          >
                            Verify
                          </button>
                        </>
                      )}
                    </td>
                    <td>
                      <button
                        className={`cancel-button ${
                          booking.status === "CANCELLED" ||
                          booking.status === "CHECKED_OUT"
                            ? "disabled-button"
                            : ""
                        }`}
                        onClick={() => handleCancel(booking.bookingId, index)}
                        disabled={
                          booking.status === "CANCELLED" ||
                          booking.status === "CHECKED_OUT"
                        }
                      >
                        Cancel
                      </button>
                      <button
                        className={`pay-now-button ${
                          booking.status === "CANCELLED"
                            ? "disabled-button"
                            : ""
                        }`}
                        onClick={() => handlePayNow(booking.bookingId, index)}
                        disabled={booking.status === "CANCELLED"}
                      >
                        Pay
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">No booking details available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />

      {/* Snackbar for messages */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BookingDetails;
