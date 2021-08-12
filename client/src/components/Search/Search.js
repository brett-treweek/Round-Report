import React from "react";
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

  export default Search;