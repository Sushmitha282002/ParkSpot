import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "../Search"; // Adjust path accordingly
import { useLocation, useNavigate } from "react-router-dom";

// Mocking react-router hooks
jest.mock("react-router-dom", () => ({
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

// Mocking axios post
jest.mock("axios", () => ({
  post: jest.fn(), // Mock the post method
}));

// Mock ParkAreaCard to simulate its behavior without actual rendering
jest.mock("../ParkAreaCard", () => jest.fn(({ area, onBookNow }) => (
  <div data-testid="park-area-card">
    <p>{area.areaname}</p>
    <button onClick={() => onBookNow(area)}>Book Now</button>
  </div>
)));

describe("Search Component", () => {
  const mockNavigate = jest.fn();
  const axios = require("axios"); // Require axios to access the mocked implementation

  beforeEach(() => {
    // Mock the useLocation and useNavigate hooks before each test
    useLocation.mockReturnValue({ state: { areaname: "TestArea" } });
    useNavigate.mockReturnValue(mockNavigate);

    jest.clearAllMocks(); // Clear mocks between tests
  });

  test("renders search results and park area cards when park areas are available", async () => {
    // Mock the axios response for park areas
    axios.post.mockResolvedValueOnce({
      data: [
        { areaid: 1, areaname: "Test Area 1" },
        { areaid: 2, areaname: "Test Area 2" },
      ],
    });

    render(<Search />);

    expect(screen.getByRole("heading", { name: /search results/i })).toBeInTheDocument();

    // Wait for park areas to be rendered
    await waitFor(() => {
      expect(screen.getAllByTestId("park-area-card")).toHaveLength(2);
    });

    // Ensure correct park area names are rendered
    expect(screen.getByText("Test Area 1")).toBeInTheDocument();
    expect(screen.getByText("Test Area 2")).toBeInTheDocument();
  });

  test("renders 'No park areas found' when no park areas are available", async () => {
    // Mock the axios response with an empty array (no park areas)
    axios.post.mockResolvedValueOnce({ data: [] });

    render(<Search />);

    // Wait for the "No park areas found" message
    await waitFor(() => {
      expect(screen.getByText(/no park areas found/i)).toBeInTheDocument();
    });
  });

  test("navigates to Vehicle page when 'Book Now' button is clicked", async () => {
    const mockArea = { areaid: 1, areaname: "Test Area 1" };

    // Mock the axios response for park areas
    axios.post.mockResolvedValueOnce({
      data: [mockArea],
    });

    render(<Search />);

    // Wait for the park area card to be rendered
    await waitFor(() => {
      expect(screen.getByTestId("park-area-card")).toBeInTheDocument();
    });

    // Simulate clicking the "Book Now" button
    fireEvent.click(screen.getByText(/book now/i));

    // Check if navigation happened with the correct state
    expect(mockNavigate).toHaveBeenCalledWith("/Vehicle", { state: { area: mockArea } });
  });
});
