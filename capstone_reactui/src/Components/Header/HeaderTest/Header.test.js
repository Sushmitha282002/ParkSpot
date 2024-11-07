import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Header from "../Header";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("Header Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      user: {
        user: {
          token: null,
          role: null,
          firstname: "",
          lastname: "",
          username: "",
          firstLetter: "",
          loginType: null,
        },
      },
    });
  });

  test("renders without crashing", () => {
    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact Us")).toBeInTheDocument();
    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByText("Signup")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("shows user avatar and dropdown when logged in", () => {
    store = mockStore({
      user: {
        user: {
          token: "test-token",
          role: "user",
          firstname: "John",
          lastname: "Doe",
          username: "john@example.com",
          firstLetter: "J",
          loginType: "local",
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    // Click on user avatar to open dropdown
    const avatar = screen.getByText("J");
    fireEvent.click(avatar);

    // Check if user details are displayed in the dropdown
    expect(screen.getByText(/FName:/)).toHaveTextContent("John");
    expect(screen.getByText(/LName:/)).toHaveTextContent("Doe");
    expect(screen.getByText(/Email:/)).toHaveTextContent("john@example.com");

    // Check if logout button is present
    const logoutButton = screen.getByText("Logout");
    expect(logoutButton).toBeInTheDocument();
  });

  test("logout button calls handleLogout", () => {
    store = mockStore({
      user: {
        user: {
          token: "test-token",
          role: "user",
          firstname: "John",
          lastname: "Doe",
          username: "john@example.com",
          firstLetter: "J",
          loginType: "local",
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    // Click on user avatar to open dropdown
    const avatar = screen.getByText("J");
    fireEvent.click(avatar);

    // Click logout button
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);

    // Check if the user is logged out (Redux store can be checked in integration tests)
    // In this isolated test, we just check if the button is no longer in the document
    expect(logoutButton).not.toBeInTheDocument();
  });

  test("dropdown closes when clicking outside", () => {
    store = mockStore({
      user: {
        user: {
          token: "test-token",
          role: "user",
          firstname: "John",
          lastname: "Doe",
          username: "john@example.com",
          firstLetter: "J",
          loginType: "local",
        },
      },
    });

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    // Click on user avatar to open dropdown
    const avatar = screen.getByText("J");
    fireEvent.click(avatar);

    // Verify dropdown is visible
    expect(screen.getByText(/FName:/)).toBeInTheDocument();

    // Click outside the dropdown
    fireEvent.mouseDown(document);

    // Verify dropdown is not visible
    expect(screen.queryByText(/FName:/)).not.toBeInTheDocument();
  });

  test("shows the correct home link based on user role", () => {
    const roles = [
      { token: "test-token", role: "user", expected: "/dashboard" },
      { token: "test-token", role: "admin", expected: "/dashboard1" },
      { token: "test-token", role: "provider", expected: "/dashboard2" },
      { token: null, role: null, expected: "/" },
    ];

    roles.forEach(({ token, role, expected }) => {
      store = mockStore({
        user: {
          user: {
            token: token,
            role: role,
            firstname: "John",
            lastname: "Doe",
            username: "john@example.com",
            firstLetter: "J",
            loginType: "local",
          },
        },
      });

      render(
        <Provider store={store}>
          <Router>
            <Header />
          </Router>
        </Provider>
      );

      // Assert that the Home link points to the expected location
      expect(screen.getByText("Home").closest('a')).toHaveAttribute("href", expected);
    });
  });
});
