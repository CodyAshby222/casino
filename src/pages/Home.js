import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h3>Home</h3>
      <Link to="/black-jack">Black Jack</Link>
      <Link to="/craps">Craps</Link>
      <Link to="/poker">Poker</Link>
      <Link to="/roulette">Roulette</Link>
      <Link to="/slots">Slots</Link>
    </div>
  );
};

export default Home;
