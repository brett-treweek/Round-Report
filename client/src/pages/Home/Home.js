// import { Fragment } from "react";
// import { Link } from "react-router-dom";
import Map from "../../components/Map/map";
import Auth from "../../utils/auth";
import "./Home.css";
import { QUERY_HAZARDS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
// import CreateHazard from "../../pages/CreateHazard/CreateHazard";

const Home = () => {
  const { loading, data, error } = useQuery(QUERY_HAZARDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error fetching hazards {error}</p>;
  console.log("data:", data);
  const hazardData = data.getAllHazards;
  console.log("hazard data:", hazardData);
  const latlng = {
    lat: -32.03784,
    lng: 115.80174,
  };
  const zoom = 13;
  return (
    <div className="homeContainer">
      <div className="mapContainer">
        <Map hazardData={hazardData} center={latlng} zoom={zoom}/>
      {Auth.loggedIn() ? <div></div>: <p id="prompt">Sign in to add hazards</p>}
      </div>
    </div>
  );
};

export default Home;
