import React from "react";
import "./Map.css";
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
import { QUERY_HAZARDS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

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
  const { data, error } = useQuery(QUERY_HAZARDS);
  if (error) console.log("error getting hazard data", error);
  console.log("hazard data:", data);
  const hazardData = data.getAllHazards;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries: libs,
  });
  if (loadError) return <p>"error loading google script"</p>;
  if (!isLoaded) return <p>"Loading..."</p>;

  return (
    <div className="map">
      <Search />
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13.5}
        options={{ mapId: mapTheme }}
      >
        {hazardData.map((marker) => (
          <Marker
            key={marker._id}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
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

  console.log("autocomplete ready:", ready);

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

  
