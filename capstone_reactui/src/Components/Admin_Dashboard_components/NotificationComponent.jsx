import React, { useEffect, useState } from "react";

import axios from "axios";

import Header from "../Admin_Dashboard_components/Header";

import Sidebar from "../Admin_Dashboard_components/Sidebar";

import "./UserDetails.css";

import { useSelector } from "react-redux";

import {
  PENDING_PARK_AREAS_URL,
  UPDATE_PARK_AREA_STATUS_URL,
  PENDING_PARK_AREAS_TITLE,
  AREA_ID_TITLE,
  AREA_NAME_TITLE,
  LOCATION_TITLE,
  STATUS_TITLE,
  TOTAL_SLOTS_TITLE,
  PROVIDER_ID_TITLE,
  IMAGE_TITLE,
  ACTIONS_TITLE,
  PENDING_STATUS,
  ACCEPTED_STATUS,
  NO_PENDING_PARK_AREAS_MESSAGE,
  ACCEPT_BUTTON_TEXT,
  REJECT_BUTTON_TEXT,
  ERROR_FETCHING_PENDING_PARK_AREAS,
  ERROR_ACCEPTING_PARK_AREA,
  ERROR_REJECTING_PARK_AREA,
} from "../GlobalData/Constant"; // Import the constants

const NotificationComponent = () => {
  const [pendingParkAreas, setPendingParkAreas] = useState([]);

  const user = useSelector((state) => state.user.user);

  const jwttoken = user.token;

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const fetchPendingParkAreas = async () => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      };

      const response = await axios.get(PENDING_PARK_AREAS_URL, config);

      setPendingParkAreas(response.data);
    } catch (error) {
      console.error(ERROR_FETCHING_PENDING_PARK_AREAS, error);
    }
  };

  const acceptParkArea = async (areaid) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      };

      await axios.post(
        UPDATE_PARK_AREA_STATUS_URL,
        {
          areaid: areaid,

          status: 1,
        },
        config
      );

      fetchPendingParkAreas();
    } catch (error) {
      console.error(ERROR_ACCEPTING_PARK_AREA, error);
    }
  };

  const rejectParkArea = async (areaid) => {
    try {
      let config = {
        headers: {
          Authorization: `Bearer ${jwttoken}`,
        },
      };

      await axios.post(
        UPDATE_PARK_AREA_STATUS_URL,
        {
          areaid: areaid,

          status: 2,
        },
        config
      );

      fetchPendingParkAreas();
    } catch (error) {
      console.error(ERROR_REJECTING_PARK_AREA, error);
    }
  };

  useEffect(() => {
    fetchPendingParkAreas();
  }, [jwttoken]);

  return (
    <div className="user-details-grid-container">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} />
      <div
        className={`user-details-main-content ${
          openSidebarToggle ? "active" : ""
        }`}
      >
        <div className="container mt-6">
          <h2 className="text-center mb-4">{PENDING_PARK_AREAS_TITLE}</h2>
          <table className="table table-striped table-bordered user-details-table">
            <thead className="thead">
              <tr>
                <th className="text-center">{AREA_ID_TITLE}</th>
                <th className="text-center">{AREA_NAME_TITLE}</th>
                <th className="text-center">{LOCATION_TITLE}</th>
                <th className="text-center">{STATUS_TITLE}</th>
                <th className="text-center">{TOTAL_SLOTS_TITLE}</th>
                <th className="text-center">{PROVIDER_ID_TITLE}</th>
                <th className="text-center">{IMAGE_TITLE}</th>
                <th className="text-center">{ACTIONS_TITLE}</th>
              </tr>
            </thead>
            <tbody>
              {pendingParkAreas.length > 0 ? (
                pendingParkAreas.map((area) => (
                  <tr key={area.areaid}>
                    <td className="text-center">{area.areaid}</td>
                    <td className="text-center">{area.areaname}</td>
                    <td className="text-center">{area.arealocation}</td>
                    <td className="text-center">
                      {area.status === 0 ? PENDING_STATUS : ACCEPTED_STATUS}
                    </td>
                    <td className="text-center">{area.totalslots}</td>
                    <td className="text-center">{area.user.id}</td>
                    <td>
                      <img
                        src={area.image} // Correct usage of area.image
                        alt={area.areaname}
                        style={{ width: "100px", height: "auto" }}
                      />
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-success"
                        onClick={() => acceptParkArea(area.areaid)}
                        style={{ marginTop: "5px", marginLeft: "45px" }}
                      >
                        {ACCEPT_BUTTON_TEXT}
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => rejectParkArea(area.areaid)}
                        style={{ marginTop: "5px", marginLeft: "45px" }}
                      >
                        {REJECT_BUTTON_TEXT}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    {NO_PENDING_PARK_AREAS_MESSAGE}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
