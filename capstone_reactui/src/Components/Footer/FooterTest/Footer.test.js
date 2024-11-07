// Footer.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../Footer';
import { THEME_COLORS } from '../../GlobalData/Constant';
import '@testing-library/jest-dom';


describe('Footer Component', () => {
  beforeEach(() => {
    render(
      <Router>
        <Footer />
      </Router>
    );
  });

  test('renders the ParkSpot title with correct color', () => {
    const titleElement = screen.getByText('ParkSpot');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveStyle(`color: ${THEME_COLORS.login_text_color}`);
  });
});
