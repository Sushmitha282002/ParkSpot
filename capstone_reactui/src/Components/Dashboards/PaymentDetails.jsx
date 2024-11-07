import React, { useEffect, useState } from "react";

import axios from "axios";

import { useSelector } from "react-redux"; // If using Redux for storing user details

import "./PaymentDetails.css";

import Header from "../Header/Header";

import Footer from "../Footer/Footer";

import ReactPaginate from "react-paginate"; // Import pagination

import {
  PAYMENT_DETAILS_URL,
  PAYMENT_ID_TITLE,
  BOOKING_ID_TITLE,
  TOTAL_PRICE_TITLE,
  NO_PAYMENT_DETAILS_MESSAGE,
  PREVIOUS_BUTTON_TEXT,
  NEXT_BUTTON_TEXT,
  BREAK_LABEL_TEXT,
  PAGINATION_CLASS_NAME,
  PAGE_ITEM_CLASS_NAME,
  PAGE_LINK_CLASS_NAME,
  ACTIVE_CLASS_NAME,
} from "../GlobalData/Constant"; // Import the constants

const PaymentDetails = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);

  const [currentPage, setCurrentPage] = useState(0); // Add current page state

  const paymentsPerPage = 10; // Set 10 rows per page

  const user = useSelector((state) => state.user.user); // Assuming user details are in Redux store

  const userId = user.id;

  const jwttoken = user.token;

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        let config = {
          headers: {
            Authorization: `Bearer ${jwttoken}`,
          },
        };

        const response = await axios.get(
          `${PAYMENT_DETAILS_URL}/${userId}`,
          config
        );

        setPaymentDetails(response.data);
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchPaymentDetails();
  }, [userId, jwttoken]);

  // Get data for the current page

  const offset = currentPage * paymentsPerPage;

  const currentPayments = paymentDetails.slice(
    offset,
    offset + paymentsPerPage
  );

  const pageCount = Math.ceil(paymentDetails.length / paymentsPerPage); // Total number of pages

  // Handle page click

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <Header />
      <div className="payment-details-container">
        <div className="payment-details-content">
          <table className="payment-details-table">
            <thead>
              <tr>
                <th>{PAYMENT_ID_TITLE}</th>
                <th>{BOOKING_ID_TITLE}</th>
                <th>{TOTAL_PRICE_TITLE}</th>
              </tr>
            </thead>
            <tbody>
              {currentPayments.length > 0 ? (
                currentPayments.map((payment, index) => (
                  <tr key={index}>
                    <td>{payment.paymentId}</td>
                    <td>{payment.bookingId}</td>
                    <td>₹{payment.totalPrice}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">{NO_PAYMENT_DETAILS_MESSAGE}</td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Conditionally render pagination */}

          {pageCount > 1 && (
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
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentDetails;
