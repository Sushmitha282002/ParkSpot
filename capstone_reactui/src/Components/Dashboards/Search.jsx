import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ParkAreaCard from "./ParkAreaCard";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ParkAreaCard.css";
import { useNavigate } from "react-router-dom";
 
const Search = () => {
  const location = useLocation();//access to the current URL’s location object.
  const { areaname } = location.state || {};//have been passed from another component via navigation
  const [parkAreas, setParkAreas] = useState([]);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const jwttoken = user.token;
 
  useEffect(() => {
    const fetchParkAreas = async () => {
      try {
        let config = {
            headers: {
              Authorization: `Bearer ${jwttoken}`,
            },
          };
        const response = await axios.post(
          "http://localhost:6776/a17",
          { name: areaname },config
        );
        setParkAreas(response.data);
      } catch (error) {
        console.error("Error fetching park areas:", error);
      }
    };
 
    if (areaname) {
      fetchParkAreas();
    }
  }, [areaname]);
  const handleBookNow = (area) => {
    console.log("Booking area:", area);
    navigate("/Vehicle", { state: { area } });
  };
 
  return (
<div className="search-results">
<Header />
<h1 style={{ display: "flex", justifyContent: "center", margin: "10px" }}>
        Search Results
</h1>
 
      {parkAreas.length > 0 ? (
<div className="row full-width-row">
          {parkAreas.map((area) => (
<div className="col-md-4" key={area.areaid}>
<ParkAreaCard area={area} onBookNow={handleBookNow} />
</div>
          ))}
</div>
      ) : (
<h5 style={{ textAlign: "center", color: "red" }}>
          No park areas found
</h5>
      )}
 
      <Footer />
</div>
  );
};
 
export default Search;