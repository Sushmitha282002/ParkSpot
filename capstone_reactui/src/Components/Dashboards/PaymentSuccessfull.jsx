import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "aos/dist/aos.css";
import AOS from "aos";

const PaymentSuccessfull = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const handleContinueShopping = () => {
    navigate("/dashboard");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #e0f7fa 0%, #e0f9f9 100%)",
      }}
    >
      <div
        className="card p-5 text-center"
        style={{
          backgroundColor: "white",
          width: "50%",
          borderRadius: "15px",
          border: "none",
        }}
        data-aos="zoom-in"
      >
        <FaCheckCircle size={100} color="#28a745" data-aos="fade-down" />
        <h1
          className="mt-4"
          style={{ color: "#28a745", fontWeight: "700" }}
          data-aos="fade-up"
        >
          Payment Successful!
        </h1>
        <p
          className="mt-3 lead"
          style={{ color: "#6c757d" }}
          data-aos="fade-up"
        >
          Thank you for using our ParkSpot!! Your payment was processed
          successfully.
        </p>
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-primary"
            onClick={handleContinueShopping}
            style={{
              width: "25vh",
              backgroundColor: "#28a745",
              borderColor: "#28a745",
              whiteSpace: "nowrap", // Ensures the text stays in one line
            }}
          >
            Back to ParkSpot
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessfull;
