import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import AdminDashBoard from '../AdminDashBoard'; // Adjust the import path accordingly
import userSlice from '../../../features/SushStore'; // Ensure the path is correct

// Create a mock store
const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      user: userSlice, // Make sure this matches the export from your slice
    },
    preloadedState: initialState,
  });
};

describe('AdminDashBoard Component', () => {
  test('renders AdminDashBoard component', () => {
    const store = createMockStore({ user: { user: {}, token: null } }); // Mock user state
    render(
      <Provider store={store}>
        <AdminDashBoard />
      </Provider>
    );

    // Check if Header, Sidebar, and Home components are rendered
    expect(screen.getByRole('heading', { name: /header/i })).toBeInTheDocument(); // Assuming your Header has an accessible heading
    expect(screen.getByText(/home/i)).toBeInTheDocument(); // Assuming Home component has the text "Home"
  });

  test('toggles sidebar visibility', () => {
    const store = createMockStore({ user: { user: {}, token: null } }); // Mock user state
    render(
      <Provider store={store}>
        <AdminDashBoard />
      </Provider>
    );

    // Check that sidebar is initially rendered
    const sidebar = screen.getByRole('complementary'); // Assuming Sidebar has an appropriate role
    expect(sidebar).toBeVisible(); // Assuming Sidebar is visible on initial render

    // Toggle the sidebar
    const toggleButton = screen.getByRole('button', { name: /toggle sidebar/i }); // Adjust based on your button role/name
    fireEvent.click(toggleButton);

    // Check that sidebar is now hidden (if applicable)
    expect(sidebar).not.toBeVisible(); // Adjust based on your sidebar's behavior after toggle

    // Toggle back to show sidebar
    fireEvent.click(toggleButton);
    expect(sidebar).toBeVisible(); // Sidebar should be visible again
  });
});
