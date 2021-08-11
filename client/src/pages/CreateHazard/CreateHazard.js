import React, { useState } from "react";
import { ADD_HAZARD } from "../../utils/mutations";
import { useMutation, useQuery } from "@apollo/client";

let initialHazardState = {
  roundNumber: "",
  hazardType: "",
  location: "",
  message: "",
};

function CreateHazard() {
  const [hazardData, setHazardData] = useState(initialHazardState);
  const [addHazard] = useMutation(ADD_HAZARD)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hazard form data:", hazardData);

    try {
      const { data } = await addHazard({
        variables: {
          roundNumber: parseInt(hazardData.roundNumber),
          hazardType: hazardData.hazardType,
          location: hazardData.location,
          message: hazardData.message,
        },
      })
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setHazardData({ ...hazardData, [e.target.name]: e.target.value });
  };

  return (
    <div className="createHazardContainer">
      <h1 className="createHazardTitle">Create Hazard</h1>
      <div className="formContainer">
        <form className="form" onSubmit={handleSubmit}>
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
            max="100"
            placeholder="Please enter your Name"
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

          <label className="label" htmlFor="location">
            Location
          </label>
          <input
            name="location"
            onChange={handleChange}
            className="input"
            type="text"
            id="location"
            autoComplete="on"
            placeholder="Enter an address"
          />
          <label className="label" htmlFor="message">
            Message
          </label>
          <textarea
            name="message"
            onChange={handleChange}
            className="textArea"
            type="text"
            id="message"
            cols="50"
            rows="20"
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
