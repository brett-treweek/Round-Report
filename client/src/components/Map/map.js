import React from "react";
import "./Map.css";
import Hazard from "../Hazard/hazard";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  // ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
require('dotenv').config();

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -32.03784,
  lng: 115.80174,
};
const libs = [process.env.REACT_APP_LIBRARIES];
const key = [process.env.REACT_APP_GOOGLE_API_KEY];
const mapTheme = process.env.REACT_APP_MAP_ID;




function Map() {

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries: libs,
  });
  if (loadError) return "error loading google script"
  if (!isLoaded) return "Loading..."

  
  // console.log("hazardData", hazardData);
    
    
    
    
 

  

  return (
    <div className="map">
      <Search/>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13.5}
        options={{ mapId: mapTheme }}
      >
        <Marker
            key={"123445"}
            position={{ lat: -32.03784, lng: 115.80174 }}
          />
      </GoogleMap>
    </div>
  );
}

function Search() {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    // clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -32.03784, lng: () => 115.80174 },
      radius: 5000,
    },
  });

  console.log("autocomplete ready:",ready);


  return (
    <Combobox
      onSelect={async (address) => {
        try {
          const results = await getGeocode({ address });
          console.log(results);
          const { lat, lng } = await getLatLng(results[0]);
          console.log(lat, lng);
        } catch (error) {
          console.log("autocomplete error", error);
        }
      }}
    >
      <ComboboxInput
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder="Enter an address"
      />
      <ComboboxPopover>
        {status === "OK" &&
          data.map(({ place_id, description }) => (
            <ComboboxOption key={place_id} value={description} />
          ))}
      </ComboboxPopover>
    </Combobox>
  );
}

export default React.memo(Map);

/* {markers.map((marker) => (
          <Marker
            key={marker._id}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))} */
