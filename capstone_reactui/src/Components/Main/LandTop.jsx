import React from 'react';
import "./LandTop.css"
import iop from "../Pics/Driving.jpg"
function LandTop() {
    return (
        <div className="background">
           <img src={iop} alt="Driving image"/>
          <div className="text-overlay">
            <h1>Welcome to Our ParkSpot Service</h1>
            <h3>Find your perfect parking spot easily and securely.</h3>
            
          </div>
        </div>
      );
    }

export default LandTop