import React from "react";

import { Card, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";

import { setAreaId } from "../../features/SushStore";//action listener in slice and stored in susstore

import "./ParkAreaCard.css";

import {
  LOCATION_LABEL,
  AVAILABLE_SLOTS_LABEL,
  PRICE_LABEL,
  AREA_ID_LABEL,
  BOOK_NOW_BUTTON_TEXT,
} from "../GlobalData/Constant"; // Import the constants

const ParkAreaCard = ({ area, onBookNow }) => {
  const dispatch = useDispatch(); // Get the dispatch function from the Redux store

  const handleBookNow = () => {
    // Dispatch the action to store area.areaid in Redux

    dispatch(setAreaId(area.areaid));

    // Trigger the booking action

    onBookNow(area);
  };

  return (
    <div className="slot-card">
      <img className="slot-img" src={area.image} alt={area.areaname} />
      <div className="slot-content">
        <h4>{area.areaname}</h4>
        <div>
          {LOCATION_LABEL} {area.arealocation}
          <br />
          {AVAILABLE_SLOTS_LABEL} {area.availableSlots}
          <br />
          {PRICE_LABEL} ₹{area.price}/min
          <br />
          {AREA_ID_LABEL} {area.areaid}
        </div>
        <Button variant="primary" onClick={handleBookNow}>
          {BOOK_NOW_BUTTON_TEXT}
        </Button>
      </div>
    </div>
  );
};

export default ParkAreaCard;
