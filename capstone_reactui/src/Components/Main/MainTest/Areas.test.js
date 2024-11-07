import React from 'react';
import { render, screen } from '@testing-library/react';
import Areas from '../Areas'; // Adjust the import path as necessary

describe('Areas Component', () => {
  beforeEach(() => {
    render(<Areas />);
  });

  test('renders heading and subheading', () => {
    // Using getByText instead of getByRole
    const heading = screen.getByText(/Types of products/i);
    const subheading = screen.getByText(/Our Parking Products/i);
    
    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });

  test('renders parking products', () => {
    const coveredParkingHeader = screen.getByText(/ParkSpot in Garage/i);
    const coveredParkingDescription = screen.getByText(/Safe & Secure/i);
    
    const openParkingHeader = screen.getByText(/ParkSpot in Open Area/i);
    const openParkingDescription = screen.getByText(/low-cost parking/i);
    
    const twoWheelerParkingHeader = screen.getByText(/ParkSpot for Two Wheeler/i);
    const twoWheelerParkingDescription = screen.getByText(/designated areas for two-wheelers/i);
    
    expect(coveredParkingHeader).toBeInTheDocument();
    expect(coveredParkingDescription).toBeInTheDocument();
    
    expect(openParkingHeader).toBeInTheDocument();
    expect(openParkingDescription).toBeInTheDocument();
    
    expect(twoWheelerParkingHeader).toBeInTheDocument();
    expect(twoWheelerParkingDescription).toBeInTheDocument();
  });

  test('renders parking product images with correct alt text', () => {
    const coveredImage = screen.getByAltText(/Covered Parking/i);
    const openImage = screen.getByAltText(/Open Parking/i);
    const twoWheelerImage = screen.getByAltText(/Two Wheeler Parking/i);
    
    expect(coveredImage).toBeInTheDocument();
    expect(openImage).toBeInTheDocument();
    expect(twoWheelerImage).toBeInTheDocument();
  });
});
