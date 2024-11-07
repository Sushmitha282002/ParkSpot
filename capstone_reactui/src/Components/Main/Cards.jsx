import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../Main/Cards.css";

const Cards = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="cards-container-landing bg-white">
      <div className="card-landing" data-aos="fade-up">
        <h3 className="h3-landing">Save Money</h3>
        <p className="p-landing">
          Save up to 20% on our site compared to the cost of other parking
          platforms.
        </p>
      </div>
      <div className="card-landing" data-aos="fade-up" data-aos-delay="200">
        <h3 className="h3-landing">Save Time</h3>
        <p className="p-landing">
          It's easy to compare parking spots. Booking a reservation is quick and
          simple.
        </p>
      </div>
      <div className="card-landing" data-aos="fade-up" data-aos-delay="400">
        <h3 className="h3-landing">Save Stress</h3>
        <p className="p-landing">
          Guarantee your parking spot by booking in advance. Can't make it?
          Cancellations are free.
        </p>
      </div>
      <div className="card-landing" data-aos="fade-up" data-aos-delay="600">
        <h3 className="h3-landing">Safety & Security</h3>
        <p className="p-landing">
          Don't worry, we got you covered. Choose safety features like CCTV,
          Security guard, etc.
        </p>
      </div>
    </div>
  );
};

export default Cards;
