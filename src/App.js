import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home";
import BlackJack from "./pages/BlackJack";
import Craps from "./pages/Craps";
import Poker from "./pages/Poker";
import Roulette from "./pages/Roulette";
import Slots from "./pages/Slots";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/black-jack" component={BlackJack} />
      <Route exact path="/craps" component={Craps} />
      <Route exact path="/poker" component={Poker} />
      <Route exact path="/roulette" component={Roulette} />
      <Route exact path="/slots" component={Slots} />
    </Router>
  );
};

export default App;
