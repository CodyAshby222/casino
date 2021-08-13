import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Menu from "./pages/Menu";
import BlackJack from "./pages/BlackJack";
import Craps from "./pages/Craps";
import Poker from "./pages/Poker";
import Roulette from "./pages/Roulette";
import Slots from "./pages/Slots";
import { createContext, useState } from "react";

export const BankContext = createContext();

const App = () => {
  const [bank, setBank] = useState(10000);

  return (
    <BankContext.Provider value={[bank, setBank]}>
      <Router>
        <Route exact path="/">
          <div className="main row-center">
            <img
              className="main-icon"
              src="/Overall UI/Casino Icon.png"
              alt="mainTitle"
            />
          </div>
          <Link className="row-center white-text casino-font" to="/menu">
            <div className="text-overlay">
              <img
                className="play-btn"
                src="/Overall UI/ButtonUp.png"
                alt="playBtn"
              />
              <div className="btn-text">PLAY</div>
            </div>
          </Link>
        </Route>
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/black-jack" component={BlackJack} />
        <Route exact path="/craps" component={Craps} />
        <Route exact path="/poker" component={Poker} />
        <Route exact path="/roulette" component={Roulette} />
        <Route exact path="/slots" component={Slots} />
      </Router>
    </BankContext.Provider>
  );
};

export default App;
