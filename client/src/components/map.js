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
      googleMapsApiKey={REACT_APP_GOOGLE_API_KEY}
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