import React from 'react';
import { render } from '@testing-library/react';
import AboutUs from '../AboutUs'; // Adjust the import path as necessary
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import AboutUsMain from '../../Main/AboutUsMain';

// Mock the imported components
jest.mock('../../Header/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../../Footer/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../../Main/AboutUsMain', () => () => <div data-testid="about-us-main">About Us Main</div>);

describe('AboutUs Component', () => {
  test('renders Header, AboutUsMain, and Footer components', () => {
    const { getByTestId } = render(<AboutUs />);

    // Check if Header is rendered
    const headerElement = getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    // Check if AboutUsMain is rendered
    const aboutUsMainElement = getByTestId('about-us-main');
    expect(aboutUsMainElement).toBeInTheDocument();

    // Check if Footer is rendered
    const footerElement = getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
