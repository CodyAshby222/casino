import { useContext } from "react";
import { Link } from "react-router-dom";
import { BankContext } from "../App";
import Button from "../components/Button";

const Menu = () => {
  const [bank, setBank] = useContext(BankContext);
  return (
    <div className="main white-text casino-font">
      <h1 style={{ marginTop: 35, letterSpacing: 3 }} className="text-center">
        CHOOSE YOUR GAME:
      </h1>
      <div className="row-center">
        <Link to="/black-jack">
          <img
            className="icons"
            src="/Overall UI/Blackjack Icon.png"
            alt="Black Jack"
          />
        </Link>
        <Link to="/craps">
          <img className="icons" src="/Overall UI/Craps Icon.png" alt="Craps" />
        </Link>
        <Link to="/menu">
          <img className="icons" src="/Overall UI/Poker Icon.png" alt="Poker" />
        </Link>
        <Link to="/roulette">
          <img
            className="icons"
            src="/Overall UI/Roulette Icon.png"
            alt="Roulette"
          />
        </Link>
        <Link to="/slots">
          <img
            className="icons"
            src="/Overall UI/Slot Machine Icon.png"
            alt="Slots"
          />
        </Link>
      </div>
      <div className="row-space-between">
        <div></div>
        <div>
          <h2>CHIPS:</h2>
          <h2>${bank}</h2>
        </div>
      </div>
      <div className="row-space-between">
        <Button title={"BACK"} linkTo={"/"} />
        <div onClick={() => setBank(10000)}>
          <Button title={"BANK"} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
