// Search autocomplete component using google places API for searching addresses.
// Google geocoding API is used to convert addresses into co-ordinates for marker placement on map.
// Global context is used to set co-ordinates.

import React, {useContext} from "react";
import { Context } from "../../utils/GobalState"
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
  } from "use-places-autocomplete";
  import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxOption,
  } from "@reach/combobox";
  import "@reach/combobox/styles.css";
  // require('default-passive-events');

function Search() {
    
    const {
      ready,
      value,
      suggestions: { status, data },
      setValue,
      clearSuggestions,
    } = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => -32.03784, lng: () => 115.80174 },
        radius: 5000,
      },
    });
  
    const [ coords, setCoords] = useContext(Context);
    return (
      <Combobox
        onSelect={async (address) => {
          setValue(address, false)
          clearSuggestions()
          try {
            const results = await getGeocode({ address });
            const location = results[0].formatted_address;
            const { lat, lng } = await getLatLng(results[0]);
            const data = {
              lat: lat,
              lng: lng,
              address: location
            }
            setCoords(data)
            
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