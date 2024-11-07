import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import PaymentSuccessfull from "../PaymentSuccessfull";
import { useNavigate } from "react-router-dom";

// Mock useNavigate from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("PaymentSuccessfull Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigate.mockReturnValue(mockNavigate); // Mock the useNavigate hook
  });

  afterEach(() => {
    jest.clearAllMocks(); // Clear any mocked function call history after each test
  });

  it("should render Payment Successful text, icon, and button", () => {
    render(
      <MemoryRouter>
        <PaymentSuccessfull />
      </MemoryRouter>
    );

    // Check if the heading is rendered
    const heading = screen.getByText(/Payment Successful/i);
    expect(heading).toBeInTheDocument();

    // Check if the paragraph text is rendered
    const paragraph = screen.getByText(/Thank you for using our ParkSpot/i);
    expect(paragraph).toBeInTheDocument();

    // Check if the button is rendered
    const button = screen.getByRole("button", { name: /Back to ParkSpot/i });
    expect(button).toBeInTheDocument();

    // Check if the icon is rendered
    const icon = screen.getByTestId("check-circle-icon");
    expect(icon).toBeInTheDocument();
  });

  it("should navigate to /dashboard when the button is clicked", () => {
    render(
      <MemoryRouter>
        <PaymentSuccessfull />
      </MemoryRouter>
    );

    // Find the button and simulate a click event
    const button = screen.getByRole("button", { name: /Back to ParkSpot/i });
    fireEvent.click(button);

    // Check if navigate was called with the right argument
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});
