import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Ouroverview from '../Ouroverview'; // Adjust the import path if necessary
import AOS from 'aos';

jest.mock('aos'); // Mock the AOS module

describe('Ouroverview Component', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Ouroverview />
      </MemoryRouter>
    );
  });

  test('renders the story image', () => {
    const image = screen.getByAltText(/Story Image/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('landing1.png')); // Ensure the image src is correct
  });

  test('renders the Company Overview heading', () => {
    const companyHeading = screen.getByRole('heading', { level: 2, name: /Company Overview/i });
    expect(companyHeading).toBeInTheDocument();
  });

  test('renders the company overview paragraph', () => {
    const overviewParagraph = screen.getByText(/Welcome to ParkSpot, your ultimate destination for hassle-free parking solutions/i);
    expect(overviewParagraph).toBeInTheDocument();
  });

  test('renders the Our Service heading', () => {
    const serviceHeading = screen.getByRole('heading', { level: 2, name: /Our Service/i });
    expect(serviceHeading).toBeInTheDocument();
  });

  test('renders the service description paragraph', () => {
    const serviceParagraph = screen.getByText(/ParkSpot offers a range of monthly car parking services designed to meet your needs/i);
    expect(serviceParagraph).toBeInTheDocument();
  });

  test('renders the registration link', () => {
    const registrationLink = screen.getByRole('link', { name: /register your Parking Spot/i });
    expect(registrationLink).toBeInTheDocument();
    expect(registrationLink).toHaveAttribute('href', '/registration'); // Ensure the link has the correct href
  });

  test('initializes AOS on mount', () => {
    expect(AOS.init).toHaveBeenCalledWith({
      duration: 2000,
      once: true,
    });
  });
});
