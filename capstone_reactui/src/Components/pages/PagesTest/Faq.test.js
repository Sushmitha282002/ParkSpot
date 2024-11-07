import React from 'react';
import { render, screen } from '@testing-library/react';
import Faq from '../Faq'; // Adjust the import path as necessary
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';

// Mock the imported components
jest.mock('../../Header/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../../Footer/Footer', () => () => <div data-testid="footer">Footer</div>);

describe('Faq Component', () => {
  beforeEach(() => {
    render(<Faq />);
  });

  test('renders Header, Footer, and FAQ sections', () => {
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByText(/Frequently Asked Questions/i)).toBeInTheDocument();
    expect(screen.getByText(/These are the most commonly asked questions about ParkSpot/i)).toBeInTheDocument();

    const questions = [
      "1. What is ParkSpot?",
      "2. How does ParkSpot work?",
      "3. Is ParkSpot available in my city?",
      "4. How do I create an account?",
      "5. How do I book a parking spot?",
      "6. Can I cancel or modify my booking?",
      "7. Are there hourly parking options available?",
      "8. Is my vehicle secure in ParkSpot locations?"
    ];

    questions.forEach(question => {
      expect(screen.getByText(question)).toBeInTheDocument();
    });
  });

});
