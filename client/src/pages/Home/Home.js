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

  return (
    <div className="homeContainer" style={{backgroundImage: "url(./icons/blueAus.PNG)", backgroundPosition: "center", backgroundSize:"cover"}}>
      <div className="mapContainer">
        <Map hazardData={hazardData} />
      {Auth.loggedIn() ? <div></div>: <p id="prompt">Please log in to add hazards</p>}
      </div>
    </div>
  );
};

export default Home;
