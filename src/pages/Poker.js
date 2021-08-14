import { Link } from "react-router-dom";
import "../poker.css"

const Poker = () => {
  return (
    <div className="main">
      <h2 className="casino-font">Poker</h2>
      <Link to="/menu">Go Back</Link>
      <div className="pokerBoard"></div>
    </div>
  );
};

export default Poker;
