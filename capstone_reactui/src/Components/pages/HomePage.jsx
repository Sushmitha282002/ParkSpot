import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Cards from "../Main/Cards";
import LandTop from "../Main/LandTop";
import Ouroverview from "../Main/Ouroverview";
import Areas from "../Main/Areas";
function HomePage() {
  return (
    <div>
      <Header />
      <LandTop />
      <Cards />
      <Areas />
      <Ouroverview />
      <Footer />
    </div>
  );
}

export default HomePage;
