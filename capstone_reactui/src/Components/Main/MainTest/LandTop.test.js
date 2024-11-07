import React from 'react';
import { render, screen } from '@testing-library/react';
import LandTop from '../LandTop'; // Adjust the import path if necessary

describe('LandTop Component', () => {
  beforeEach(() => {
    render(<LandTop />);
  });

  test('renders the background image', () => {
    const image = screen.getByAltText(/Driving image/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('Driving.jpg')); // Ensure the image src is correct
  });

  test('renders the main heading', () => {
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Welcome to Our ParkSpot Service');
  });

  test('renders the subheading', () => {
    const subheading = screen.getByRole('heading', { level: 3 });
    expect(subheading).toBeInTheDocument();
    expect(subheading).toHaveTextContent('Find your perfect parking spot easily and securely.');
  });

  test('renders text overlay with correct class', () => {
    const textOverlay = screen.getByText(/Find your perfect parking spot easily and securely./i);
    expect(textOverlay).toBeInTheDocument();
    
    // Check if the text overlay is within a parent element with the 'text-overlay' class
    const overlayContainer = textOverlay.closest('.text-overlay');
    expect(overlayContainer).toBeInTheDocument(); // Ensure that the overlay container is in the document
    expect(overlayContainer).toHaveClass('text-overlay'); // Verify that it has the correct class
  });
});
