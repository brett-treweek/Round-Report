import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import './Map.css'

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -32.03784,
  lng: 115.80174,
};

const mapTheme = ["5ef80f0325514b92"];

function Map() {
  return (
    <div className='map'>
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
        mapIds={mapTheme}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={12}
          options={{ mapId: mapTheme }}
        >
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default React.memo(Map);
