import React, { useState } from "react";
import "./Report.css";
import Map from "../Map/map";
import { QUERY_ROUND } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const Report = (props) => {
  console.log("props", props);

  const roundHazards = props.hazards;
  console.log("round hazard data:", roundHazards);

  const { loading, data, error } = useQuery(QUERY_ROUND, {
    variables: {
      roundNumber: parseInt(props.roundData.roundNumber),
    },
  });
  console.log("data:", data);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>error fetching round data {error}</p>;

  const roundData = data.getOneRound;
  
  return (
    <div className="report">
      {data && (
        <>
          <h2 className="reportTitle">Round {roundData.roundNumber}</h2>
          <p className="reportP">Start Address: {roundData.startAddress}</p>
          <p className="reportP">LPO: {roundData.lpo}</p>
          <p className="reportP">Depot Bins: {roundData.lpo}</p>
          <p className="reportP">Important Information:</p>
          <div className="hazardCard">
            <h2 className="reportP">Hazards</h2>
            <div>
              {roundData.hazards.map((hazard) => (
                <ul>
                  <li className="reportP">
                    <p className="reportP">Type: {hazard.hazardType}</p>
                    <p className="reportP">Address: {hazard.address}</p>
                    <p className="reportP">Message: {hazard.message}</p>
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className="roundMapContainer">
            <Map hazardData={roundData.hazards} />
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
