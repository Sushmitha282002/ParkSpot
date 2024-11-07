import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ParkAreaCard from "../ParkAreaCard"; // Adjust the import based on your file structure
import { useDispatch } from "react-redux"; // Import useDispatch

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(), // Mock the useDispatch hook
}));

describe("ParkAreaCard Component", () => {
  const mockArea = {
    areaid: 1,
    areaname: "Park A",
    arealocation: "City Center",
    availableSlots: 5,
    price: 100,
    image: "path/to/image.jpg",
  };

  const mockOnBookNow = jest.fn(); // Mock function for onBookNow
  const mockDispatch = jest.fn(); // Mock dispatch function

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mock calls
    useDispatch.mockReturnValue(mockDispatch); // Set the mock dispatch return value
  });

  test("renders the ParkAreaCard component with correct data", () => {
    render(<ParkAreaCard area={mockArea} onBookNow={mockOnBookNow} />);

    // Check if the area name is rendered
    expect(screen.getByText("Park A")).toBeInTheDocument();
    // Check if the area location is rendered
    expect(screen.getByText("Location: City Center")).toBeInTheDocument();
    // Check if available slots are rendered
    expect(screen.getByText("Available Slots: 5")).toBeInTheDocument();
    // Check if price is rendered
    expect(screen.getByText("Price: ₹100/min")).toBeInTheDocument();
    // Check if area ID is rendered
    expect(screen.getByText("Area id: 1")).toBeInTheDocument();
    // Check if the image is rendered
    expect(screen.getByAltText("Park A")).toHaveAttribute("src", "path/to/image.jpg");
  });

  test("calls onBookNow when the Book Now button is clicked", () => {
    render(<ParkAreaCard area={mockArea} onBookNow={mockOnBookNow} />);

    // Click the Book Now button
    const button = screen.getByRole("button", { name: /Book Now/i });
    fireEvent.click(button);

    // Check if dispatch was called
    expect(mockDispatch).toHaveBeenCalledTimes(1); // Check if dispatch was called
    // Check if onBookNow was called with the correct area
    expect(mockOnBookNow).toHaveBeenCalledTimes(1);
    expect(mockOnBookNow).toHaveBeenCalledWith(mockArea);
  });
});
