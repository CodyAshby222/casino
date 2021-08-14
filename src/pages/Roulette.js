import { Link } from "react-router-dom";
import "../roulette.css"

const Roulette = () => {
  return (
    <div className="main">
      <h2 className="casino-font">Roulette</h2>
      <Link to="/menu">Go Back</Link>
      <div className="rouletterWheel"></div>
      <div className="rouletteBoard"></div>
    </div>
  );
};

export default Roulette;
