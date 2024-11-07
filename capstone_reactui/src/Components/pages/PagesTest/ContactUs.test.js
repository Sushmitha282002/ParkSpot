import React from 'react';
import { render } from '@testing-library/react';
import ContactUs from '../ContactUs'; // Adjust the import path as necessary
import Header from '../../Header/Header';
import Footer from '../../Footer/Footer';
import ContactUsMain from '../../Main/ContactUsMain';

// Mock the imported components
jest.mock('../../Header/Header', () => () => <div data-testid="header">Header</div>);
jest.mock('../../Footer/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../../Main/ContactUsMain', () => () => <div data-testid="contact-us-main">Contact Us Main</div>);

describe('ContactUs Component', () => {
  test('renders Header, ContactUsMain, and Footer components', () => {
    const { getByTestId } = render(<ContactUs />);

    // Check if Header is rendered
    const headerElement = getByTestId('header');
    expect(headerElement).toBeInTheDocument();

    // Check if ContactUsMain is rendered
    const contactUsMainElement = getByTestId('contact-us-main');
    expect(contactUsMainElement).toBeInTheDocument();

    // Check if Footer is rendered
    const footerElement = getByTestId('footer');
    expect(footerElement).toBeInTheDocument();
  });
});
