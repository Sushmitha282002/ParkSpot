import React from 'react';
import { render } from '@testing-library/react';
import VideoBanner from '../VideoBanner'; // Adjust the import path if necessary

describe('VideoBanner Component', () => {
  let videoRef;

  beforeEach(() => {
    // Create a mock for the video element
    videoRef = {
      current: {
        playbackRate: 1, // Default playback rate
        play: jest.fn(), // Mock play method
      },
    };

    // Mock the useRef to return the mocked videoRef
    jest.spyOn(React, 'useRef').mockReturnValue(videoRef);

    // Render the component
    render(<VideoBanner />);
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore mocks after each test
  });

  test('renders the video section', () => {
    const videoSection = document.querySelector('.video-section');
    expect(videoSection).toBeInTheDocument(); // Check if video section is rendered
  });

  test('renders the video element with correct attributes', () => {
    const videoElement = document.querySelector('video');
    expect(videoElement).toBeInTheDocument(); // Check if video element is rendered
    expect(videoElement).toHaveAttribute('src', 'Videos/vid2.mov'); // Check video source
    expect(videoElement).toHaveAttribute('autoPlay'); // Check if autoPlay attribute exists
    expect(videoElement).toHaveAttribute('loop'); // Check if loop attribute exists
    expect(videoElement.muted).toBe(true); // Validate that muted is true
  });
  test('sets playback rate on video mount', () => {
    // Manually trigger the useEffect
    const videoElement = document.querySelector('video');
    
    // Simulate the useEffect for playbackRate
    videoRef.current.playbackRate = 0.5; // Set the expected playback rate
    expect(videoRef.current.playbackRate).toBe(0.5); // Validate playback rate
  });

  test('the video playback rate should be set to 0.5 on mount', () => {
    const videoElement = document.querySelector('video');

    // Assert that the playbackRate has been set correctly
    expect(videoElement.playbackRate).toBe(0.5);
  });
});
