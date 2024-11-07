import React, { useEffect } from "react";
import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Main/ContactUsMain.css";
import VideoBanner from "./VideoBanner";
 
const ContactUsMain = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-in-out",
    });
    AOS.refresh();
  }, []);
 
  // WhatsApp Number and Message
  const whatsappNumber = "9961673466";
  const whatsappMessage = "Hello, I have a query regarding ParkSpot.";
 
  const handleWhatsAppClick = () => {
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappURL, "_blank");
  };
 
  return (
    <div>
      <VideoBanner />
 
      <div className="contact-us-container">
        {/* Background Image with Opacity and Filter */}
        <div className="background-overlay"></div>
 
        {/* Contact Header */}
        <section className="contactSarath-header" data-aos="fade-up">
          <h1>
            Contact <span>ParkSpot</span>
          </h1>
          <p data-aos="zoom-in">We'd love to hear from you!</p>
        </section>
 
        {/* Contact Details Section */}
        <section className="contact-details" data-aos="fade-up">
          <h2>Get in Touch</h2>
          <p>
            Have any questions or need help? Feel free to reach out to us via
            phone, email, or visit us at our office!
          </p>
          <div className="contact-info">
            <div className="contact-item" data-aos="fade-left">
              <FaPhoneAlt size={40} className="icon" />
              <h3>Phone</h3>
              <p>+91 9961673466</p>
            </div>
            <div className="contact-item" data-aos="fade-left">
              <FaEnvelope size={40} className="icon" />
              <h3>Email</h3>
              <p>parkspot4@gmail.com</p>
            </div>
            <div className="contact-item" data-aos="fade-left">
              <FaMapMarkerAlt size={40} className="icon" />
              <h3>Location</h3>
              <p>Electonic City, Bengaluru</p>
            </div>
          </div>
          {/* Transparent Line Separator */}
          <div className="line-separator"></div>
 
          {/* WhatsApp Section */}
          <section className="whatsapp-section">
            <h2>Contact Us on WhatsApp</h2>
            <button className="whatsapp-btn" onClick={handleWhatsAppClick}>
              <FaWhatsapp size={30} style={{ marginRight: "10px" }} />
              Chat with Us
            </button>
          </section>
        </section>
      </div>
    </div>
  );
};
 
export default ContactUsMain;