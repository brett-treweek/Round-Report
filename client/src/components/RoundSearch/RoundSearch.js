import React, { useState } from "react";
import Report from "../Report/Report";
import "./RoundSearch.css";


const RoundSearch = () => {
  const [requestedRound, setRequestedRound] = useState(null);
  const [change, setChange] = useState(null)
 
  const handleChange = (e) => {
    setChange({roundNumber: e.target.value});
  };
  
  

  function handleOnClick(e) {
    setRequestedRound(change)
      e.preventDefault()
  }
  console.log("requestedRound:", requestedRound);

  return (
    <div className="reportContainer">
      <div className="searchContainer">
        <form className="searchForm">
          <label htmlFor="roundNumber" className="label">
            Enter a round number
          </label>
          <input
            label="roundNumber"
            onChange={handleChange}
            type="number"
            className="input"
            min="1"
            max="10"
            placeholder="Please enter the Round Number"
          />
          <button className="button" onClick={handleOnClick}>
            submit
          </button>
        </form>
      </div>
      {requestedRound && <Report roundData={requestedRound} />}
    </div>
  );
};

export default RoundSearch;
// hazardData={hazardData}
