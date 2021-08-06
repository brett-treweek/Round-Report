import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const containerStyle = {
  width: '80vw',
  height: '80vh',
};

const center = {
  lat: -32.037840,
  lng: 115.801740
};

const mapTheme = ["5ef80f0325514b92"]

function Map() {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyArt4QZtuOr-ro5duk7cqHKbNB6lPSJSHY"
      mapIds={mapTheme}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        options={{mapId: mapTheme}}
        
      >
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(Map)