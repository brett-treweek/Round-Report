import React, { useState } from "react";
import { QUERY_HAZARDS } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import "./Map.css";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -32.03784,
  lng: 115.80174,
};

const key = process.env.REACT_APP_GOOGLE_API_KEY;
const libs = ["places"];
const mapTheme = ["5ef80f0325514b92"];

function Map() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries: libs,
  });

  const [markers, setMarkers] = useState([]);
  const { loading, data } = useQuery(QUERY_HAZARDS);

  console.log(data);
  console.log(isLoaded);

  if (loading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="map">
      <h1>Add Hazard</h1>
      <Search/>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13.5}
          options={{ mapId: mapTheme }}
        >
          <></>
        </GoogleMap>
    </div>
  );
}

const Search = () => {
  //   if (loadError) return 'error loading maps';
  //   if (!isLoaded) return 'loading maps';

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -32.03784, lng: () => 115.80174 },
      radius: 1000,
    },
  });

  console.log(ready);
  console.log(data);

  return (
    <Combobox
      onSelect={(address) => {
        console.log(address);
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
          data.map(({ id, description }) => (
            <ComboboxOption key={id} value={description} />
          ))}
      </ComboboxPopover>
    </Combobox>
  );
};

export default React.memo(Map);
