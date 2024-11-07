import React, { useEffect, useRef } from "react";
import "./VideoBanner.css"; // Import the external CSS file
 
export default function VideoBanner() {
  const videoRef = useRef(null);
 
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5; // Set the playback speed to 1.5x
    }
  }, []);
 
  return (
    <div>
      {/* Video Section */}
      <div className="video-section">
        <video
          ref={videoRef}
          className="video-background"
          src="Videos/vid2.mov"
          autoPlay
          loop
          muted
        />
      </div>
    </div>
  );
}