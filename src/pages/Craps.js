import { Link } from "react-router-dom";
import "../craps.css";

const Craps = () => {
  return (
    <div className="main">
      <h2 className="casino-font">Craps</h2>
      <Link to="/">Go Back</Link>
      <div className="crapsBoard"></div>
    </div>
  );
};

export default Craps;
