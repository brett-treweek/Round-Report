import React, { useState } from "react";
import Report from "../Report/Report";
import "./RoundSearch.css";

// Component for seraching for round number.
// Only sets state of input value on click of submit, which then dynamically updates round report with round number as props.
const RoundSearch = () => {
  const [requestedRound, setRequestedRound] = useState(null);
  const [change, setChange] = useState(null)
 
  const handleChange = (e) => {
    setChange({roundNumber: e.target.value});
  };
  
  

  function handleOnClick(e) {
    e.preventDefault()
    setRequestedRound(change)
  }

  return (
    <div className="reportContainer">
      <div className="searchContainer">
        <form className="searchForm">
        <label htmlFor="roundNumber" className="label" id="searchLabel">
            Enter a round number
          </label>
          <input
            label="roundNumber"
            onChange={handleChange}
            type="number"
            className="input"
            id="searchInput"
            min="1"
            max="10"
            placeholder="Round Number"
          />
          <button className="button" id="searchBtn" onClick={handleOnClick}>
            submit
          </button>
        </form>
      </div>
      {requestedRound && <Report roundData={requestedRound} />}
    </div>
  );
};

export default RoundSearch;

