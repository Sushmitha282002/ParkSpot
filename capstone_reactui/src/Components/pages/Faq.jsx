import React from 'react'
import './Faq.css';
import { FaPix } from "react-icons/fa6";
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
function Faq() {
  return (
    <div >
        <Header/>
        <div className='faq'>
        <div className="heading">
        <h2>Frequently Asked Questions</h2>
        <p>These are the most commonly asked questions about ParkSpot</p>
      </div>
    <div className='faq-body'>
      <div>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
             1. What is ParkSpot?
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              ParkSpot is an online platform that connects parking space owners with people looking for convenient and affordable parking options. Whether you're looking for daily, hourly, or long-term parking, ParkSpot helps you find the right spot.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
             2. How does ParkSpot work?
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              ParkSpot allows users to search for available parking spots based on location and duration. Once you find a spot, you can book it online. If you're a parking spot owner, you can list your available spaces on the platform and earn passive income.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              3. Is ParkSpot available in my city?
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              ParkSpot is continuously expanding. Check the availability of services in your city by entering your location on our website or mobile app.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
             4. How do I create an account?
              </button>
            </h2>
            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              Simply click on the "Sign Up" button on our website, enter your details, and create an account. You can also sign up using your Google or Facebook account.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
             5. How do I book a parking spot?
              </button>
            </h2>
            <div id="collapseFive" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              After finding a parking spot, click on the "Book Now" button. You’ll need to sign in or create an account, then follow the on-screen instructions to complete your reservation.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
             6. Can I cancel or modify my booking?

              </button>
            </h2>
            <div id="collapseSix" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              Yes, you can modify or cancel your booking from your account dashboard. 

              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSeven" aria-expanded="false" aria-controls="collapseSeven">
             7. Are there hourly parking options available?
              </button>
            </h2>
            <div id="collapseSeven" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              Yes, ParkSpot offers flexible parking options, including hourly, daily, and long-term parking. Simply filter your search by duration when looking for a spot.
              </div>
            </div>
          </div>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseEight" aria-expanded="false" aria-controls="collapseEight">
              8. Is my vehicle secure in ParkSpot locations?
              </button>
            </h2>
            <div id="collapseEight" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
              <div className="accordion-body">
              Most of our listed parking spots come with security features like surveillance cameras, gated access, and on-site personnel. However, we recommend reviewing the details of each parking space before booking.
              </div>
            </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Faq
