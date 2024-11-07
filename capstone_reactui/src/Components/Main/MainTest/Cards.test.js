import React from 'react';
import { render, screen } from '@testing-library/react';
import Cards from '../Cards'; // Adjust the import path as necessary
import AOS from 'aos'; // Ensure AOS is imported for mocking

// Mock the AOS module
jest.mock('aos', () => ({
  init: jest.fn(),
}));

describe('Cards Component', () => {
  beforeEach(() => {
    render(<Cards />);
  });

  test('renders all card headings and descriptions', () => {
    const headings = [
      /Save Money/i,
      /Save Time/i,
      /Save Stress/i,
      /Safety & Security/i,
    ];

    const descriptions = [
      /Save up to 20% on our site compared to the cost of other parking platforms/i,
      /It's easy to compare parking spots\. Booking a reservation is quick and simple\./i,
      /Guarantee your parking spot by booking in advance\. Can't make it\? Cancellations are free\./i,
      /Don't worry, we got you covered\. Choose safety features like CCTV, Security guard, etc\./i,
    ];

    headings.forEach(heading => {
      const headingElement = screen.getByRole('heading', { name: heading });
      expect(headingElement).toBeInTheDocument();
    });

    descriptions.forEach(description => {
      const descriptionElement = screen.getByText(description);
      expect(descriptionElement).toBeInTheDocument();
    });
  });

  test('renders the correct number of cards', () => {
    const cards = screen.getAllByText(/Save/i); // All headings start with "Save"
    expect(cards.length).toBe(4); // There are 4 cards
  });

  test('initializes AOS on mount', () => {
    expect(AOS.init).toHaveBeenCalledWith({ duration: 1000 });
  });

  test('renders cards with correct data-aos attributes', () => {
    const firstCard = screen.getByText(/Save Money/i).closest('.card-sarath');
    const secondCard = screen.getByText(/Save Time/i).closest('.card-sarath');
    const thirdCard = screen.getByText(/Save Stress/i).closest('.card-sarath');
    const fourthCard = screen.getByText(/Safety & Security/i).closest('.card-sarath');

    expect(firstCard).toHaveAttribute('data-aos', 'fade-up');
    expect(secondCard).toHaveAttribute('data-aos', 'fade-up');
    expect(secondCard).toHaveAttribute('data-aos-delay', '200');
    expect(thirdCard).toHaveAttribute('data-aos', 'fade-up');
    expect(thirdCard).toHaveAttribute('data-aos-delay', '400');
    expect(fourthCard).toHaveAttribute('data-aos', 'fade-up');
    expect(fourthCard).toHaveAttribute('data-aos-delay', '600');
  });
});
