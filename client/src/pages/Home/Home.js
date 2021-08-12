import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import Map from "../../components/Map/map";
import Auth from "../../utils/auth";
import { Context } from "../../utils/GobalState";

import "./Home.css";

const Home = () => {
  const [state, setState] = useContext(Context);

  return (
    <Fragment>
      <div className="mapContainer">
        <Map />
      </div>

      <div className="buttonContainer">
        {Auth.loggedIn() ? (
          <Link className="btn addHazard" exact="true" to="/create-hazard">
            Add Hazard
          </Link>
        ) : (
          <p>Please log In to add Hazards</p>
        )}
      </div>
    </Fragment>
  );
};

export default Home;
