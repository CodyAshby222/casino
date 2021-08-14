import { Link } from "react-router-dom";
import "../slots.css"

const Slots = () => {
  return (
    <div className="main">
      <h2 className="casino-font">Slots</h2>
      <Link to="/menu">Go Back</Link>
      <div className="slotsBoard"></div>
    </div>
  );
};

export default Slots;
