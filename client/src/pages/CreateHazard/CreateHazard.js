import React, { useState, useContext } from "react";
import { Context } from "../../utils/GobalState";
import { ADD_HAZARD } from "../../utils/mutations";
import { useMutation } from "@apollo/client";
import "./CreateHazard.css";
import Search from "../../components/Search/Search";
import { useLoadScript } from "@react-google-maps/api";
// require("default-passive-events");

let initialHazardState = {
  roundNumber: "",
  hazardType: "",
  location: "",
  message: "",
};
const libs = [process.env.REACT_APP_LIBRARIES];
const key = [process.env.REACT_APP_GOOGLE_API_KEY];

function CreateHazard(props) {
  const [coords, setCoords] = useContext(Context);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries: libs,
  });

  console.log("coords data:", coords);
  const [hazardData, setHazardData] = useState(initialHazardState);
  const [addHazard] = useMutation(ADD_HAZARD);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("hazard form data:", hazardData);
    const data = localStorage.getItem('deets')
    const userDeets = JSON.parse(data)
    console.log("createHazard userdeets",userDeets);
    try {
      const { data } = await addHazard({
        variables: {
          roundNumber: parseInt(hazardData.roundNumber),
          hazardType: hazardData.hazardType,
          address: coords.address,
          lat: coords.lat,
          lng: coords.lng,
          message: hazardData.message,
          user: userDeets._id,
        },
      });
      window.location.assign('/');
      console.log(data);
    } catch (error) {
      window.location.assign('/');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setHazardData({ ...hazardData, [e.target.name]: e.target.value });
  };
  if (loadError) return <p>"error loading google script"</p>;
  if (!isLoaded) return <p>"Loading..."</p>;

  return (
    <div
      className="createHazardContainer"
      style={{
        backgroundImage: "url(./icons/blueNightCity.PNG)",
        backgroundPosition: "right center",
        backgroundSize: "cover",
      }}
    >
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
          <p className="label">Enter Address of Hazard</p>
          <Search />
          <label className="label" htmlFor="rndNum">
            Round Number
          </label>
          <input
            name="roundNumber"
            onChange={handleChange}
            className="input"
            type="number"
            id="rndNum"
            min="1"
            max="10"
            placeholder="Please enter the Round Number "
          />

          <label className="label" htmlFor="hazardType">
            Hazard Type
          </label>
          <select
            className="select"
            name="hazardType"
            id="hazardType"
            onChange={handleChange}
          >
            <option value="">--Please choose a hazard type--</option>
            <option value="Aggresive Dog">Aggresive Dog</option>
            <option value="Aggresive Magpie">Aggresive Magpie</option>
            <option value="Blind Driveway">Blind Driveway</option>
            <option value="Slippery Surface">Slippery Surface</option>
            <option value="School">School</option>
            <option value="Intersection">Intersection</option>
            <option value="Roadworks">Roadworks</option>
            <option value="Missing Letterbox">Missing Letterbox</option>
            <option value="Aggresive Human">Aggresive Human</option>
            <option value="Other">Other</option>
          </select>

          <label className="label" htmlFor="message">
            Message
          </label>
          <textarea
            name="message"
            onChange={handleChange}
            className="textArea"
            type="text"
            id="message"
            cols="20"
            rows="5"
            placeholder="Add Notes"
          />

          <button className="button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateHazard;
