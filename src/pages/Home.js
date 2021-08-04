import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="main">
      <h1 className="casino-font text-center">Home</h1>
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
        <Link to="/poker">
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
    </div>
  );
};

export default Home;
