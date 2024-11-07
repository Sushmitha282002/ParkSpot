import React, { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux";

import Header from "../Admin_Dashboard_components/Header";

import Sidebar from "../Admin_Dashboard_components/Sidebar";

import ReactPaginate from "react-paginate"; // Import ReactPaginate for pagination

import "./UserDetails.css"; // Import the CSS file

import {
  PROVIDER_COUNT_URL,
  PROVIDERS_INFORMATION_TITLE,
  ID_TITLE,
  FIRST_NAME_TITLE,
  LAST_NAME_TITLE,
  USERNAME_TITLE,
  MOBILE_TITLE,
  ROLE_TITLE,
  NO_PROVIDERS_FOUND_MESSAGE,
  PREVIOUS_BUTTON_TEXT,
  NEXT_BUTTON_TEXT,
  BREAK_LABEL_TEXT,
  PAGINATION_CLASS_NAME,
  PAGE_ITEM_CLASS_NAME,
  PAGE_LINK_CLASS_NAME,
  ACTIVE_CLASS_NAME,
} from "../GlobalData/Constant"; // Import the constants

function ProviderDetails() {
  const user = useSelector((state) => state.user.user);

  const [providers, setProviders] = useState([]);

  const [currentPage, setCurrentPage] = useState(0); // Track the current page

  const [itemsPerPage] = useState(10);

  const jwttoken = user.token;

  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const response = await axios.get(PROVIDER_COUNT_URL, config);

        setProviders(response.data);
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };

    if (jwttoken) {
      fetchProviders();
    }
  }, [jwttoken]);

  // Calculate the displayed providers based on current page

  const displayedProviders = providers.slice(
    currentPage * itemsPerPage,

    (currentPage + 1) * itemsPerPage
  );

  // Handle page change

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
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
          <h2 className="text-center mb-4">{PROVIDERS_INFORMATION_TITLE}</h2>
          <table className="table table-striped table-bordered user-details-table">
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
              {displayedProviders.length > 0 ? (
                displayedProviders.map((provider) => (
                  <tr key={provider.id}>
                    <td>{provider.id}</td>
                    <td>{provider.firstname}</td>
                    <td>{provider.lastname}</td>
                    <td>{provider.username}</td>
                    <td>{provider.mobile}</td>
                    <td>{provider.role}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    {NO_PROVIDERS_FOUND_MESSAGE}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination Component */}

          {providers.length > itemsPerPage && (
            <ReactPaginate
              previousLabel={PREVIOUS_BUTTON_TEXT}
              nextLabel={NEXT_BUTTON_TEXT}
              breakLabel={BREAK_LABEL_TEXT}
              pageCount={Math.ceil(providers.length / itemsPerPage)} // Calculate total pages
              marginPagesDisplayed={2} // Number of pages to display at the start and end
              pageRangeDisplayed={3} // Number of pages to display around the current page
              onPageChange={handlePageChange} // Handle page click
              containerClassName={PAGINATION_CLASS_NAME}
              pageClassName={PAGE_ITEM_CLASS_NAME}
              pageLinkClassName={PAGE_LINK_CLASS_NAME}
              previousClassName={PAGE_ITEM_CLASS_NAME}
              previousLinkClassName={PAGE_LINK_CLASS_NAME}
              nextClassName={PAGE_ITEM_CLASS_NAME}
              nextLinkClassName={PAGE_LINK_CLASS_NAME}
              breakClassName={PAGE_ITEM_CLASS_NAME}
              breakLinkClassName={PAGE_LINK_CLASS_NAME}
              activeClassName={ACTIVE_CLASS_NAME} // Style active page
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProviderDetails;
