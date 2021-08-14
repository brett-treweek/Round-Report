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
  console.log("RRRRRR", roundData);
  return (
    <div className="report">
      {data && (
        <>
          <h2 className="reportTitle">Round {roundData.roundNumber}</h2>
          <p className="genP">Start Address: {roundData.startAddress}</p>
          <p className="genP">LPO: {roundData.lpo}</p>
          <p className="genP">Depot Bins: {roundData.lpo}</p>

          <h2 className="reportH2">Hazards</h2>
          <div className="hazardCards">
            {roundData.hazards.map((hazard) => (
              <div className="hazardCard" key={hazard._id}>
                <p className="reportP">{hazard.hazardType}</p>
                <p className="reportP">{hazard.address}</p>
                <p className="reportP">Message: {hazard.message}</p>
              </div>
            ))}
          </div>
          <div className="roundMapContainer">
            <Map
              hazardData={roundData.hazards}
              center={{lat: roundData.lat, lng: roundData.lng}}
              zoom={13}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Report;
