// Homepage- Gets all hazard data and passes data as props to map component along with center co-ordinates and zoom level.
// User prompted to sign in to add hazards.
import Map from "../../components/Map/map";
import Auth from "../../utils/auth";
import "./Home.css";
import { QUERY_HAZARDS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

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
  const zoom = 14;
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
