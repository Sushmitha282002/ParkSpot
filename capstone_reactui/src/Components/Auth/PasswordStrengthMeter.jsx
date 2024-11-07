import React from "react";

import "./PasswordStrengthMeter.css"; // Create a separate CSS file for styles

import { STRENGTH_COLORS, STRENGTH_TEXT } from "../GlobalData/Constant"; // Import the constants

const PasswordStrengthMeter = ({ strength }) => {
  return (
    <div className="password-strength-meter">
      <div
        className="password-strength-bar"
        style={{
          width: `${strength * 25}%`,

          backgroundColor: STRENGTH_COLORS[strength],
        }}
      />
      <div className="strength-text">{STRENGTH_TEXT[strength]}</div>
    </div>
  );
};

export default PasswordStrengthMeter;
