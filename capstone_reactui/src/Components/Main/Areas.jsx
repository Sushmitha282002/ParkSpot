import React from 'react'
import './Areas.css';

function Areas() {
  return (
    <div>
        <div className='heading_area'>
            <h6>Types of products</h6>
            <h1>Our Parking Products</h1>
        </div>
        <div className='parking-products'>
        <div className='parking-product'>
          <img src="utils/covered.jpg" alt="Covered Parking" />
          <div className='parking-details'>
            <h6>ParkSpot in Garage</h6>
            <p>Safe & Secure: Our garages are equipped with state-of-the-art security systems, including surveillance cameras, controlled access, and well-lit areas for added safety.</p>
          </div>
        </div>
        <div className='parking-product'>
          <img src="utils/open.jpg" alt="Open Parking" />
          <div className='parking-details'>
            <h6>ParkSpot in Open Area</h6>
            <p> Enjoy low-cost parking with flexible options, including hourly, daily, or long-term plans. Our open-air parking solutions provide great value for money.</p>
          </div>
        </div>
        <div className='parking-product'>
          <img src="utils/2wheeler.jpg" alt="Two Wheeler Parking" />
          <div className='parking-details'>
            <h6>ParkSpot for Two Wheeler</h6>
            <p>Our lots offer designated areas for two-wheelers, ensuring you don’t have to worry about finding space or competing with larger vehicles.</p>
          </div>
        </div>
             
        </div>
    </div>
  )
}

export default Areas