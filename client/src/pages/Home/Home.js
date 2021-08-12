import { Fragment } from "react";
// import { Link } from "react-router-dom";
import Map from "../../components/Map/map";
import Auth from "../../utils/auth";
import "./Home.css";
import { QUERY_HAZARDS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import CreateHazard from "../../pages/CreateHazard/CreateHazard";


const Home = () => {
  const { loading, data, error } = useQuery(QUERY_HAZARDS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error fetching hazards {error}</p>;
  console.log("data:", data);
  const hazardData = data.getAllHazards;
  console.log('hazard data:', hazardData);

  return (
    <Fragment>
      <div className="mapContainer">
        <Map hazardData={hazardData}/>
      </div>

      
        {Auth.loggedIn() ? (
          <div className="buttonContainer">
          <CreateHazard/>
          </div>
        ) : (
          <p>Please log In to add Hazards</p>
          
        )}
      
    </Fragment>
  );
};

export default Home;
