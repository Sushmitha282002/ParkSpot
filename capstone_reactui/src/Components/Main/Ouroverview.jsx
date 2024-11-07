import React, { useEffect } from "react";
import "./Overview.css"; // Import your CSS file for styling
import im from "../Pics/landing1.png";
import { Link } from "react-router-dom";
import AOS from "aos"; // Import AOS
import "aos/dist/aos.css"; // Import AOS CSS

function Ouroverview() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 2000, // Adjusted animation duration
      once: true, // Ensures animation runs only once
    });
  }, []);

  return (
    <div>
      <div className="overview-container">
        {/* Left side with the image */}
        <div className="image-container" data-aos="fade-right">
          <img src={im} alt="Story Image" className="story-image" />
        </div>

        {/* Right side with the story */}
        <div className="story-container" data-aos="fade-left" mb-3>
          <h2>Company Overview:</h2>
          <p>
            Welcome to ParkSpot, your ultimate destination for hassle-free
            parking solutions. At ParkSpot, our mission is to revolutionize the
            parking experience by providing convenient and reliable monthly car
            parking services. We value efficiency, reliability, and customer
            satisfaction above all else.
          </p>
          <hr />
          <h2>Our Service:</h2>
          <p>
            ParkSpot offers a range of monthly car parking services designed to
            meet your needs. With our user-friendly platform, finding and
            booking a parking spot is quick and easy. Experience the convenience
            and benefits of secure parking tailored to your requirements.Let's
            get started and{" "}
            <Link to="/registration">register your Parking Spot</Link> with your
            parking companion.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Ouroverview;
