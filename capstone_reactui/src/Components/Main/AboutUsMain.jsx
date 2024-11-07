// src/components/AboutUs.js

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Main/AboutUsMain.css"; // Custom CSS for styling
import { FaParking, FaCarSide, FaCity } from "react-icons/fa";

const AboutUsMain = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      offset: 120, // Offset for triggering animation
      easing: "ease-in-out", // Smooth easing for animations
      once: true, // Trigger animations once
    });
    AOS.refresh(); // Refresh AOS after initializing
  }, []);

  return (
    <div className="about-us-container">
      {/* Hero Section */}
      <section className="about-us-hero">
        <h1 data-aos="fade-up">
          About <span>ParkSpot</span>
        </h1>
        <p data-aos="zoom-in">Making Parking Effortless, One Spot at a Time</p>
        <img
          src="/Utils/parking-hero.jpeg"
          alt="Parking Hero"
          className="hero-image"
          data-aos="flip-right"
        />
      </section>

      {/* Who We Are Section */}
      <section className="about-section" data-aos="fade-up">
        <h2>Who We Are</h2>
        <p>
          At <strong>ParkSpot</strong>, we are revolutionizing the way people
          find and book parking spots in busy urban areas. Our goal is to
          provide a seamless, stress-free parking experience that saves time and
          effort.
        </p>
        <img
          src="/Utils/urban-parking.jpg"
          alt="Urban Parking"
          className="about-image"
          data-aos="zoom-in-up"
        />
      </section>

      {/* Our Mission */}
      <section className="about-section mission-section" data-aos="flip-up">
        <h2>Our Mission</h2>
        <p>
          Our mission is to simplify parking by connecting drivers with nearby
          parking spaces using advanced technology and real-time availability.
        </p>
        <div className="icon-group">
          <FaParking size={50} className="icon" />
          <FaCarSide size={50} className="icon" />
          <FaCity size={50} className="icon" />
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="about-section" data-aos="fade-left">
        <h2>Why Choose Us?</h2>
        <ul className="about-list">
          <li>Seamless and intuitive user experience</li>
          <li>Wide coverage in urban and suburban areas</li>
          <li>Plan ahead with our reserve-in-advance feature</li>
          <li>Secure payments and reliable parking solutions</li>
        </ul>
        <img
          src="/Utils/why-choose-us.jpg"
          alt="Why Choose Us"
          className="about-image"
          data-aos="fade-right"
        />
      </section>

      {/* Vision Section */}
      <section className="about-section vision-section" data-aos="zoom-in">
        <h2>Our Vision</h2>
        <p>
          We believe in a future where smart cities and innovative mobility
          solutions reduce traffic and support sustainability.
        </p>
        <img
          src="/Utils/smart-city.jpg"
          alt="Smart City Vision"
          className="about-image"
          data-aos="zoom-out"
        />
      </section>
    </div>
  );
};

export default AboutUsMain;
