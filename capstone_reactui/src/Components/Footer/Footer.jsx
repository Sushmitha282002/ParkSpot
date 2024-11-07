import React from "react";
import {
  FaWhatsapp,
  FaFacebook,
  FaCopyright,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "./Footer.css";

import { THEME_COLORS } from "../GlobalData/Constant";

function Footer() {
  return (
    <div className="container-fluid">
      <div className="row footer">
        <div className="col-md-4">
          <div className="logo">
            <h2
              className="title text-start"
              style={{ color: THEME_COLORS.login_text_color }}
            >
              ParkSpot
            </h2>
          </div>
          <div className="title_footer tagline text-start">
            <p>
              A ParkSpot is a website designed to make finding and reserving
              parking spots easier and more convenient.
            </p>
          </div>
          <div className="copyrights text-start">
            <FaCopyright /> 2024 ParkSpot. All rights reserved
          </div>
        </div>

        <div className="col-md-2">
          <div className="footerNav text-start">
            <h5
              style={{
                borderLeft: "2px solid #aacbf9",
                paddingLeft: "5px",
                height: "25px",
              }}
            >
              Links
            </h5>
            <ul className="ps-2">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="#">Contact Us</Link>
              </li>
              <li>
                <Link to="*">Our Team</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-2">
          <div className="footerNav text-start">
            <h5
              style={{
                borderLeft: "2px solid #aacbf9",
                paddingLeft: "5px",
                height: "25px",
              }}
            >
              Others
            </h5>
            <ul className="ps-2">
              <li>
                <Link to="*">Terms of Service</Link>
              </li>
              <li>
                <Link to="*">Privacy Policy</Link>
              </li>
              <li>
                <Link to="*">Portfolio</Link>
              </li>
              <li>
                <Link to="*">Corporate</Link>
              </li>
              <li>
                <Link to="*">Advertise</Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-4">
          <h5
            style={{
              borderLeft: "2px solid #aacbf9",
              paddingLeft: "5px",
              height: "25px",
              textAlign: "start",
            }}
          >
            Others
          </h5>
          <div className="socialIcons s-heading text-start">
            <div>
              <p className="text-start">Follow us on social media</p>
            </div>
          </div>
          <div className="icons">
            <div className="icon_width">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp style={{ color: "#25d366" }} />
              </a>
            </div>
            <div className="icon_width">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook style={{ color: "#1877F2" }} />
              </a>
            </div>
            <div className="icon_width">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram style={{ color: "#fccc63" }} />
              </a>
            </div>
            <div className="icon_width">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin style={{ color: "#0077B5" }} />
              </a>
            </div>
            <div className="icon_width">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter style={{ color: "#1DA1F2" }} />
              </a>
            </div>
          </div>

          <div className="dropdown">
            <button
              className="btn btn-secondary btn-sm dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              English
            </button>
            <ul className="dropdown-menu">
              <li>
                <Link to="#" className="dropdown-item">
                  English
                </Link>
              </li>
              {/* Additional language options */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
