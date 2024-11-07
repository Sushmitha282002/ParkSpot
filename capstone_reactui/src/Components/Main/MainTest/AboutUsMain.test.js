// src/components/__tests__/AboutUsMain.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUsMain from '../AboutUsMain'; // Adjust the import path based on your project structure
import AOS from 'aos';

// Mock AOS library (to avoid initializing animations in the test)
jest.mock('aos', () => ({
  init: jest.fn(),
  refresh: jest.fn(),
}));

describe('AboutUsMain Component', () => {
  beforeEach(() => {
    // Render the AboutUsMain component before each test
    render(<AboutUsMain />);
  });

  test('should initialize AOS on component mount', () => {
    expect(AOS.init).toHaveBeenCalledWith({
      duration: 1000,
      offset: 120,
      easing: 'ease-in-out',
      once: true,
    });
    expect(AOS.refresh).toHaveBeenCalled();
  });

  test('renders the hero section with correct content', () => {
    const heroHeading = screen.getByRole('heading', { level: 1 });
    expect(heroHeading).toHaveTextContent(/About ParkSpot/i);

    const heroParagraph = screen.getByText(/Making Parking Effortless, One Spot at a Time/i);
    expect(heroParagraph).toBeInTheDocument();

    const heroImage = screen.getByAltText(/Parking Hero/i);
    expect(heroImage).toBeInTheDocument();
  });

  test('renders the "Who We Are" section', () => {
    const whoWeAreHeader = screen.getByRole('heading', { level: 2, name: /Who We Are/i });
    expect(whoWeAreHeader).toBeInTheDocument();

    const whoWeAreText = screen.getByText(/revolutionizing the way people find and book parking spots/i);
    expect(whoWeAreText).toBeInTheDocument();

    const urbanParkingImage = screen.getByAltText(/Urban Parking/i);
    expect(urbanParkingImage).toBeInTheDocument();
  });

  test('renders the "Our Mission" section with icons', () => {
    const missionHeader = screen.getByRole('heading', { level: 2, name: /Our Mission/i });
    expect(missionHeader).toBeInTheDocument();

    const missionText = screen.getByText(/Our mission is to simplify parking/i);
    expect(missionText).toBeInTheDocument();

    const icons = screen.getAllByRole('img'); // Assuming icons render as images or use a test id
    expect(icons.length).toBeGreaterThan(0); // Ensure at least one icon is rendered
  });

  test('renders the "Why Choose Us?" section', () => {
    const whyChooseHeader = screen.getByRole('heading', { level: 2, name: /Why Choose Us\?/i });
    expect(whyChooseHeader).toBeInTheDocument();

    const listItems = [
      'Seamless and intuitive user experience',
      'Wide coverage in urban and suburban areas',
      'Plan ahead with our reserve-in-advance feature',
      'Secure payments and reliable parking solutions',
    ];

    listItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });

    const whyChooseImage = screen.getByAltText(/Why Choose Us/i);
    expect(whyChooseImage).toBeInTheDocument();
  });

  test('renders the "Our Vision" section', () => {
    const visionHeader = screen.getByRole('heading', { level: 2, name: /Our Vision/i });
    expect(visionHeader).toBeInTheDocument();

    const visionText = screen.getByText(/We believe in a future/i);
    expect(visionText).toBeInTheDocument();

    const smartCityImage = screen.getByAltText(/Smart City Vision/i);
    expect(smartCityImage).toBeInTheDocument();
  });
});
