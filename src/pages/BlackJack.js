import { Link } from "react-router-dom";
import "../blackJack.css"

const BlackJack = () => {
  return (
    <div className="main">
      <h2 className="casino-font">Black Jack</h2>
      <Link to="/menu">Go Back</Link>
      <div className="blackJackBoard"></div>
    </div>
  );
};

export default BlackJack;
