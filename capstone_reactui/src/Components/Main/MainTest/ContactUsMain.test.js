import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactUsMain from '../ContactUsMain'; // Adjust the import path based on your project structure
import AOS from 'aos';
import VideoBanner from '../VideoBanner';

// Mock AOS library (to avoid initializing animations in the test)
jest.mock('aos', () => ({
  init: jest.fn(),
  refresh: jest.fn(),
}));

// Mock VideoBanner component
jest.mock('../VideoBanner', () => () => <div role="banner">Mocked Video Banner</div>);

// Mock window.open for WhatsApp button clicks
global.open = jest.fn();
describe('ContactUsMain Component', () => {
  beforeEach(() => {
    // Render the ContactUsMain component before each test
    render(<ContactUsMain />);
  });

  test('should initialize AOS on component mount', () => {
    expect(AOS.init).toHaveBeenCalledWith({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
    expect(AOS.refresh).toHaveBeenCalled();
  });

  test('renders the VideoBanner component', () => {
    const videoBannerElement = screen.getByRole('banner');
    expect(videoBannerElement).toBeInTheDocument();
  });

  test('renders the Contact header with correct text', () => {
    const headerElement = screen.getByRole('heading', { level: 1 });
    expect(headerElement).toHaveTextContent(/Contact ParkSpot/i);
  });
  
  test('renders the subtext under contact header', () => {
    const subtextElement = screen.getByText(/We'd love to hear from you!/i);
    expect(subtextElement).toBeInTheDocument();
  });

  test('renders the "Get in Touch" section with correct content', () => {
    const getInTouchHeader = screen.getByText(/Get in Touch/i);
    expect(getInTouchHeader).toBeInTheDocument();

    const contactParagraph = screen.getByText(
      /Have any questions or need help\? Feel free to reach out to us via phone, email, or visit us at our office!/i
    );
    expect(contactParagraph).toBeInTheDocument();
  });

  test('renders phone contact information', () => {
    const phoneElement = screen.getByText(/\+91 9961673466/i);
    expect(phoneElement).toBeInTheDocument();

    const phoneIcon = screen.getByTestId('phone-icon');
    expect(phoneIcon).toBeInTheDocument();
  });

  test('renders email contact information', () => {
    const emailElement = screen.getByText(/parkspot4@gmail.com/i);
    expect(emailElement).toBeInTheDocument();

    const emailIcon = screen.getByTestId('email-icon');
    expect(emailIcon).toBeInTheDocument();
  });

  test('renders location contact information', () => {
    const locationElement = screen.getByText(/Electronic City, Bengaluru/i);
    expect(locationElement).toBeInTheDocument();

    const locationIcon = screen.getByTestId('location-icon');
    expect(locationIcon).toBeInTheDocument();
  });

  test('renders WhatsApp button and triggers WhatsApp link correctly', () => {
    const whatsappButton = screen.getByRole('button', { name: /Chat with Us/i });
    expect(whatsappButton).toBeInTheDocument();

    // Simulate WhatsApp click
    fireEvent.click(whatsappButton);

    const whatsappNumber = '9961673466';
    const whatsappMessage = 'Hello, I have a query regarding ParkSpot.';
    const expectedWhatsAppUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      whatsappMessage
    )}`;

    expect(global.open).toHaveBeenCalledWith(expectedWhatsAppUrl, '_blank');
  });

  test('renders all icons correctly', () => {
    const phoneIcon = screen.getByTestId('phone-icon');
    const emailIcon = screen.getByTestId('email-icon');
    const locationIcon = screen.getByTestId('location-icon');
    const whatsappIcon = screen.getByTestId('whatsapp-icon');

    expect(phoneIcon).toBeInTheDocument();
    expect(emailIcon).toBeInTheDocument();
    expect(locationIcon).toBeInTheDocument();
    expect(whatsappIcon).toBeInTheDocument();
  });

  test('should display the line separator between sections', () => {
    const lineSeparator = screen.getByTestId('line-separator');
    expect(lineSeparator).toBeInTheDocument();
  });
  
});
