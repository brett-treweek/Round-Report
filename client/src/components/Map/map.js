import React from "react";
import "./Map.css";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
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
require('default-passive-events');


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

function Map(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries: libs,
  });
  const [selected, setSelected] = React.useState(null)
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, [])


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
        onLoad={onMapLoad}
      >
        {props.hazardData.map((marker) => (
          <Marker
            key={marker._id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: './icons/alert.png',
              scaledSize: new window.google.maps.Size(20, 20),
            }}
            onClick={() => {
              setSelected(marker);
              
            }}
          />
        ))}
        {selected ? (<InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={()=>{
          console.log(selected);
          setSelected(null)
        }}>
          <div>
            <h3>{selected.hazardType}</h3>
            <p>{selected.address}</p>
            <p>Round Number: {selected.roundNumber}</p>
            <p>{selected.message}</p>
          </div>
        </InfoWindow>): null}
      </GoogleMap>
    </div>
  );
}

export function Search() {
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
        className="searchBox"
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

  
