import React, { useEffect, useState } from "react";

import axios from "axios";

import "./WeeklyDataTable.css"; // Import the new CSS file

import Header from "../Admin_Dashboard_components/Header";

import Sidebar from "../Admin_Dashboard_components/Sidebar";

import { useSelector } from "react-redux";

import ReactPaginate from "react-paginate"; // Import ReactPaginate for pagination

import {
  WEEKLY_USERS_URL,
  WEEKLY_PROVIDERS_URL,
  BOOKING_COUNTS_URL,
  WEEKLY_REGISTERED_USERS_PROVIDERS_TITLE,
  BOOKINGS_OVER_LAST_WEEK_TITLE,
  DAY_TITLE,
  REGISTERED_USERS_TITLE,
  REGISTERED_PROVIDERS_TITLE,
  BOOKING_COUNT_TITLE,
  PREVIOUS_BUTTON_TEXT,
  NEXT_BUTTON_TEXT,
  BREAK_LABEL_TEXT,
  PAGINATION_CLASS_NAME,
  PAGE_ITEM_CLASS_NAME,
  PAGE_LINK_CLASS_NAME,
  ACTIVE_CLASS_NAME,
} from "../GlobalData/Constant"; // Import the constants

function WeeklyDataTable() {
  const [weeklyData, setWeeklyData] = useState([]);

  const [bookingData, setBookingData] = useState([]);

  const [weeklyCurrentPage, setWeeklyCurrentPage] = useState(0); // Pagination for weekly data

  const [bookingCurrentPage, setBookingCurrentPage] = useState(0); // Pagination for booking data

  const [itemsPerPage] = useState(5); // Limit 10 rows per page for both tables

  const user = useSelector((state) => state.user.user);

  const jwttoken = user.token;

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const [userResponse, providerResponse] = await Promise.all([
          axios.get(WEEKLY_USERS_URL, config),

          axios.get(WEEKLY_PROVIDERS_URL, config),
        ]);

        const userData = userResponse.data;

        const providerData = providerResponse.data;

        const combinedData = userData.map((userItem) => ({
          day: userItem.day,

          users: userItem.count,

          providers:
            providerData.find(
              (providerItem) => providerItem.day === userItem.day
            )?.count || 0,
        }));

        setWeeklyData(combinedData);
      } catch (error) {
        console.error("Error fetching weekly registration data:", error);
      }
    };

    const fetchBookingCounts = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const response = await axios.get(BOOKING_COUNTS_URL, config);

        const transformedData = Object.entries(response.data).map(
          ([day, count]) => ({
            day,

            count,
          })
        );

        setBookingData(transformedData);
      } catch (error) {
        console.error("Error fetching booking counts:", error);
      }
    };

    fetchWeeklyData();

    fetchBookingCounts();
  }, [jwttoken]);

  // Pagination for weekly data

  const displayedWeeklyData = weeklyData.slice(
    weeklyCurrentPage * itemsPerPage,

    (weeklyCurrentPage + 1) * itemsPerPage
  );

  // Pagination for booking data

  const displayedBookingData = bookingData.slice(
    bookingCurrentPage * itemsPerPage,

    (bookingCurrentPage + 1) * itemsPerPage
  );

  // Handlers for page change

  const handleWeeklyPageChange = ({ selected }) => {
    setWeeklyCurrentPage(selected);
  };

  const handleBookingPageChange = ({ selected }) => {
    setBookingCurrentPage(selected);
  };

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
          <div className="weekly-table">
            <h3>{WEEKLY_REGISTERED_USERS_PROVIDERS_TITLE}</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>{DAY_TITLE}</th>
                  <th>{REGISTERED_USERS_TITLE}</th>
                  <th>{REGISTERED_PROVIDERS_TITLE}</th>
                </tr>
              </thead>
              <tbody>
                {displayedWeeklyData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.day}</td>
                    <td>{item.users}</td>
                    <td>{item.providers}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination for Weekly Data */}

            {weeklyData.length > itemsPerPage && (
              <ReactPaginate
                previousLabel={PREVIOUS_BUTTON_TEXT}
                nextLabel={NEXT_BUTTON_TEXT}
                breakLabel={BREAK_LABEL_TEXT}
                pageCount={Math.ceil(weeklyData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handleWeeklyPageChange}
                containerClassName={PAGINATION_CLASS_NAME}
                pageClassName={PAGE_ITEM_CLASS_NAME}
                pageLinkClassName={PAGE_LINK_CLASS_NAME}
                previousClassName={PAGE_ITEM_CLASS_NAME}
                previousLinkClassName={PAGE_LINK_CLASS_NAME}
                nextClassName={PAGE_ITEM_CLASS_NAME}
                nextLinkClassName={PAGE_LINK_CLASS_NAME}
                breakClassName={PAGE_ITEM_CLASS_NAME}
                breakLinkClassName={PAGE_LINK_CLASS_NAME}
                activeClassName={ACTIVE_CLASS_NAME}
              />
            )}

            <h3>{BOOKINGS_OVER_LAST_WEEK_TITLE}</h3>
            <table className="styled-table">
              <thead>
                <tr>
                  <th>{DAY_TITLE}</th>
                  <th>{BOOKING_COUNT_TITLE}</th>
                </tr>
              </thead>
              <tbody>
                {displayedBookingData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.day}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination for Booking Data */}

            {bookingData.length > itemsPerPage && (
              <ReactPaginate
                previousLabel={PREVIOUS_BUTTON_TEXT}
                nextLabel={NEXT_BUTTON_TEXT}
                breakLabel={BREAK_LABEL_TEXT}
                pageCount={Math.ceil(bookingData.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handleBookingPageChange}
                containerClassName={PAGINATION_CLASS_NAME}
                pageClassName={PAGE_ITEM_CLASS_NAME}
                pageLinkClassName={PAGE_LINK_CLASS_NAME}
                previousClassName={PAGE_ITEM_CLASS_NAME}
                previousLinkClassName={PAGE_LINK_CLASS_NAME}
                nextClassName={PAGE_ITEM_CLASS_NAME}
                nextLinkClassName={PAGE_LINK_CLASS_NAME}
                breakClassName={PAGE_ITEM_CLASS_NAME}
                breakLinkClassName={PAGE_LINK_CLASS_NAME}
                activeClassName={ACTIVE_CLASS_NAME}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeeklyDataTable;
