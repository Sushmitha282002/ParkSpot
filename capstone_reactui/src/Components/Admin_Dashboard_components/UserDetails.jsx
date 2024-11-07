import React, { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import Header from "../Admin_Dashboard_components/Header";

import Sidebar from "../Admin_Dashboard_components/Sidebar";

import ReactPaginate from "react-paginate";

import "./UserDetails.css"; // Import the CSS file

import {
  USER_COUNT_URL,
  USERS_INFORMATION_TITLE,
  ID_TITLE,
  FIRST_NAME_TITLE,
  LAST_NAME_TITLE,
  USERNAME_TITLE,
  MOBILE_TITLE,
  ROLE_TITLE,
  NO_USERS_FOUND_MESSAGE,
  PREVIOUS_BUTTON_TEXT,
  NEXT_BUTTON_TEXT,
  BREAK_LABEL_TEXT,
  PAGINATION_CLASS_NAME,
  PAGE_ITEM_CLASS_NAME,
  PAGE_LINK_CLASS_NAME,
  ACTIVE_CLASS_NAME,
} from "../GlobalData/Constant"; // Import the constants

function UserDetails() {
  const user = useSelector((state) => state.user.user);

  const [users, setUsers] = useState([]);

  const [currentPage, setCurrentPage] = useState(0); // Current page state

  const jwttoken = user.token;

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const usersPerPage = 10; // Limit to 10 users per page

  const offset = currentPage * usersPerPage;

  const pageCount = Math.ceil(users.length / usersPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const response = await axios.get(USER_COUNT_URL, config);

        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (jwttoken) {
      fetchUsers();
    }
  }, [jwttoken]);

  // Function to handle page change

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className="user-details-grid-container">
      {" "}
      {/* Updated class name */}
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} />
      <div
        className={`user-details-main-content ${
          openSidebarToggle ? "active" : ""
        }`}
      >
        <div className="container mt-6">
          <h2 className="text-center mb-4">{USERS_INFORMATION_TITLE}</h2>
          <table className="table table-striped table-bordered user-details-table">
            {" "}
            {/* Updated class name */}
            <thead className="thead">
              <tr>
                <th>{ID_TITLE}</th>
                <th>{FIRST_NAME_TITLE}</th>
                <th>{LAST_NAME_TITLE}</th>
                <th>{USERNAME_TITLE}</th>
                <th>{MOBILE_TITLE}</th>
                <th>{ROLE_TITLE}</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users

                  .slice(offset, offset + usersPerPage) // Display users for the current page

                  .map((user) => (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user.firstname}</td>
                      <td>{user.lastname}</td>
                      <td>{user.username}</td>
                      <td>{user.mobile}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    {NO_USERS_FOUND_MESSAGE}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination controls */}
          <ReactPaginate
            previousLabel={PREVIOUS_BUTTON_TEXT}
            nextLabel={NEXT_BUTTON_TEXT}
            breakLabel={BREAK_LABEL_TEXT}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
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
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
