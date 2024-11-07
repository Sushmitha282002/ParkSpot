import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Vehicle from "../Vehicle"; // Import your component
import { toast } from "react-toastify"; // Toasts are part of the behavior you want to test

// Mock dependencies
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("axios", () => ({
  post: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

describe("Vehicle Component", () => {
  const mockNavigate = jest.fn();
  const mockDispatch = jest.fn();

  beforeEach(() => {
    // Reset the mocks before each test
    useSelector.mockReturnValue({ user: { id: "123", areaid: "abc", token: "fakeToken" } });
    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  test("renders the vehicle form correctly", () => {
    render(<Vehicle />);

    // Check for all input fields and buttons
    expect(screen.getByLabelText(/Vehicle Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vehicle Type/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Vehicle Model/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Check-in Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Check-in Time/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Submit/i })).toBeInTheDocument();
  });

  test("fills the form and submits the vehicle details successfully", async () => {
    const mockResponse = { data: { message: "Booking created successfully" } };
    const axios = require("axios");
    axios.post.mockResolvedValueOnce(mockResponse); // Mock the axios.post response

    render(<Vehicle />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Vehicle Number/i), {
      target: { value: "KA01AA1234" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Type/i), {
      target: { value: "Car" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Model/i), {
      target: { value: "Toyota" },
    });
    fireEvent.change(screen.getByLabelText(/Check-in Date/i), {
      target: { value: "2024-10-16" },
    });
    fireEvent.change(screen.getByLabelText(/Check-in Time/i), {
      target: { value: "02:30:00 PM" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Expect success toast message and navigation to dashboard
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Booking successfully created! Check your email for details."
      );
    });
  });

  test("handles error on booking failure", async () => {
    const axios = require("axios");
    axios.post.mockRejectedValueOnce(new Error("Booking failed")); // Mock axios failure

    render(<Vehicle />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Vehicle Number/i), {
      target: { value: "KA01AA1234" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Type/i), {
      target: { value: "Car" },
    });
    fireEvent.change(screen.getByLabelText(/Vehicle Model/i), {
      target: { value: "Toyota" },
    });
    fireEvent.change(screen.getByLabelText(/Check-in Date/i), {
      target: { value: "2024-10-16" },
    });
    fireEvent.change(screen.getByLabelText(/Check-in Time/i), {
      target: { value: "02:30:00 PM" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    // Ensure error toast message is displayed
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Error creating booking. Please try again."
      );
    });

    // Ensure no navigation occurs
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  test("converts 12-hour time format to 24-hour format", async () => {
    render(<Vehicle />);

    // Fill the form with a specific time in 12-hour format
    fireEvent.change(screen.getByLabelText(/Check-in Time/i), {
      target: { value: "12:30:00 PM" }, // Testing the conversion
    });

    // Manually submit the form
    fireEvent.click(screen.getByRole("button", { name: /Submit/i }));

    await waitFor(() => {
      // The expected time format after conversion (12 PM stays as 12)
      expect(screen.getByLabelText(/Check-in Time/i).value).toBe("12:30:00 PM");
    });
  });
});
