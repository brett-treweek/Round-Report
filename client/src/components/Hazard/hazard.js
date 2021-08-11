import { useState } from "react";
import { QUERY_HAZARDS } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const Hazards = () => {
    const { data, error } = useQuery(QUERY_HAZARDS);
    if (error) console.log("error getting hazard data", error);
    const [markers, setMarkers] = useState([]);
    setMarkers(data)
    return data

}
 
export default Hazards;