// THIS COMPONENT IS STILL IN DEVELOPMENT
import React from "react";
import "./Map.css";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Theme from "../Theme";
import Auth from "../../utils/auth";
// import icons from '../../utils/icons'
// import { DELETE_HAZARD } from "../../utils/mutations";
// import { useMutation } from "@apollo/client";
// require("default-passive-events");

const containerStyle = {
  width: "100%",
  height: "100%",
};

// referencing environmental variables.
const libs = [process.env.REACT_APP_LIBRARIES];
const key = [process.env.REACT_APP_GOOGLE_API_KEY];
const mapTheme = Theme;

// Map component takes hazard data as props.
function Map(props) {
  // const [deleteHazard] = useMutation(DELETE_HAZARD);

  // script to load google maps.
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries: libs,
  });
  // using state to set selected markers on map.
  const [selected, setSelected] = React.useState(null);

  if (loadError) return <p>"error loading google script"</p>;
  if (!isLoaded) return <p>"Loading..."</p>;

  // function to delete hazards.
  const handleDelete = async (e) => {
    //   e.preventDefault()
    //   try {
    //     const id = selected._id
    //     console.log('AAAAAAAAAAAA',id);
    //     const deleted = await deleteHazard({_id: selected._id})
    //     console.log('Hazard Deleted',deletedHazard);
    //   } catch (error) {
    //     console.log('error deleting hazard',error);
    //   }
  };

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={props.center}
        zoom={props.zoom}
        options={{ styles: mapTheme }}
      >
        {props &&
          props.hazardData.map((marker) => (
            <Marker
              key={marker._id}
              position={{ lat: marker.lat, lng: marker.lng }}
              icon={{
                url: "./icons/redwarning.png",
                scaledSize: new window.google.maps.Size(25, 25),
              }}
              onClick={() => {
                setSelected(marker);
              }}
            />
          ))}

        {selected ? (
          <InfoWindow
            className="infoWindow"
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              console.log(selected);
              setSelected(null);
            }}
          >
            <div className="infoContainer">
              <h3 className="infoH3">{selected.hazardType}</h3>
              <p className="infoP">{selected.address}</p>
              <p className="infoP">Round Number: {selected.roundNumber}</p>
              <p className="infoP">{selected.message}</p>
              {Auth.loggedIn() && (
                <button className="infoDelete" onClick={handleDelete}>
                  Delete
                </button>
              )}
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default React.memo(Map);
