// Round Report page- renders roundSearch component.
import "./RoundReport.css";
import RoundSearch from "../../components/RoundSearch/RoundSearch";

const RoundReport = () => {
  

  return (
    <div
      className="roundContainer"
      style={{
        backgroundImage: "url(./icons/purpleCity.PNG)",
        backgroundPosition: "right center",
        backgroundSize: "cover",
      }}
    >
      <RoundSearch/>
      
    </div>
  );
};

export default RoundReport;
