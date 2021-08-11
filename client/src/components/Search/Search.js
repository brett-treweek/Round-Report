import { useJsApiLoader } from "@react-google-maps/api";
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
const key = process.env.REACT_APP_GOOGLE_API_KEY

const Search = () => {

    const { isLoaded } = useJsApiLoader({
        id: `https://maps.googleapis.com/maps/api/js?key=${key}&libraries=places&callback=initMap`,
        googleMapsApiKey: key
      })
      console.log(isLoaded);

   
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -32.03784, lng: () => 115.80174 },
      radius: 100 * 1000,
    },
  });

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
    </Combobox>
  );
};

export default Search;
