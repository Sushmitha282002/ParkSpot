import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage"; // Adjust the import path as necessary
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import Cards from "../../Main/Cards";
import LandTop from "../../Main/LandTop";
import Ouroverview from "../../Main/Ouroverview";
import Areas from "../../Main/Areas";

// Mock the imported components
jest.mock("../../Header/Header", () => () => <div data-testid="header">Header</div>);
jest.mock("../../Footer/Footer", () => () => <div data-testid="footer">Footer</div>);
jest.mock("../../Main/Cards", () => () => <div data-testid="cards">Cards</div>);
jest.mock("../../Main/LandTop", () => () => <div data-testid="landtop">LandTop</div>);
jest.mock("../../Main/Ouroverview", () => () => <div data-testid="ouroverview">Ouroverview</div>);
jest.mock("../../Main/Areas", () => () => <div data-testid="areas">Areas</div>);

describe("HomePage Component", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  test("renders Header component", () => {
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  test("renders LandTop component", () => {
    expect(screen.getByTestId("landtop")).toBeInTheDocument();
  });

  test("renders Cards component", () => {
    expect(screen.getByTestId("cards")).toBeInTheDocument();
  });

  test("renders Areas component", () => {
    expect(screen.getByTestId("areas")).toBeInTheDocument();
  });

  test("renders Ouroverview component", () => {
    expect(screen.getByTestId("ouroverview")).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
