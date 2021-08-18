import { Link } from "react-router-dom";
import "../roulette.css";

import roulletteWheel from "../Roulette/RouletteWheel_SingleZero.png";

import { rouletterNumbers } from "../components/roulletteWheel";
import { useState } from "react";

const Roulette = () => {
  const [degrees, setdegrees] = useState(1000);
  const [wheelNum, setWheenNum] = useState(null);

  const spinWheel = (extraValue) => {
    const wheel = document.getElementById("Wheel");
    console.log("spin");
    console.log(extraValue);

    wheel.style.transitionDuration = "5s";
    wheel.style.transform = `rotate(${degrees}deg)`;
    setdegrees(extraValue);
    getNum();
  };

  const getNum = () => {
    let wheelNum = Math.floor(Math.random() * 36);
    let wheelPosition = rouletterNumbers[wheelNum];
    setWheenNum(wheelPosition);
  };

  return (
    <div className="Roulette">
      <div className="header">
        <h2 className="casino-font">Roulette</h2>
        <Link to="/">Go Back</Link>
      </div>
      <div className="rouletterGame">
        <div className="rouletterWheel">
          <img className="rouletterWheel" id="Wheel" src={roulletteWheel}></img>
        </div>
        <div className="rouletteBoard">
          <div className="mainBoard">
            <div className="zero">0</div>
            <div className="rows">
              <div className="row">
                <div className="betOption">3</div>
                <div className="betOption">6</div>
                <div className="betOption">9</div>
                <div className="betOption">12</div>
                <div className="betOption">15</div>
                <div className="betOption">18</div>
                <div className="betOption">21</div>
                <div className="betOption">24</div>
                <div className="betOption">27</div>
                <div className="betOption">30</div>
                <div className="betOption">33</div>
                <div className="betOption">36</div>
              </div>
              <div className="row">
                <div className="betOption">2</div>
                <div className="betOption">5</div>
                <div className="betOption">8</div>
                <div className="betOption">11</div>
                <div className="betOption">14</div>
                <div className="betOption">17</div>
                <div className="betOption">20</div>
                <div className="betOption">23</div>
                <div className="betOption">26</div>
                <div className="betOption">39</div>
                <div className="betOption">32</div>
                <div className="betOption">35</div>
              </div>
              <div className="row">
                <div className="betOption">1</div>
                <div className="betOption">4</div>
                <div className="betOption">7</div>
                <div className="betOption">10</div>
                <div className="betOption">13</div>
                <div className="betOption">16</div>
                <div className="betOption">19</div>
                <div className="betOption">22</div>
                <div className="betOption">25</div>
                <div className="betOption">28</div>
                <div className="betOption">31</div>
                <div className="betOption">34</div>
              </div>
            </div>
            <div className="twoToOneBet">
              <div className="OneToTwoOption">2 To 1</div>
              <div className="OneToTwoOption">2 To 1</div>
              <div className="OneToTwoOption">2 To 1</div>
            </div>
          </div>
          <div className="betOptions">
            <div className="columnOne">
              <div className="oneToTwelve"></div>
              <div className="betOptions2">
                <div className="bottomBets"></div>
                <div className="bottomBets"></div>
              </div>
            </div>
            <div className="columnOne">
              <div className="oneToTwelve"></div>
              <div className="betOptions2">
                <div className="bottomBets"></div>
                <div className="bottomBets"></div>
              </div>
            </div>
            <div className="columnOne">
              <div className="oneToTwelve"></div>
              <div className="betOptions2">
                <div className="bottomBets"></div>
                <div className="bottomBets"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {wheelNum !== null ? (
          <div>
            <h1 style={{ color: "white" }}>{wheelNum.num}</h1>
            <h1 style={{ color: "white" }}>{wheelNum.color}</h1>
          </div>
        ) : (
          <div></div>
        )}
        <div
          style={{ width: "200px", height: "20px", backgroundColor: "red" }}
          onClick={() => spinWheel(degrees + 1200)}
        >
          help
        </div>
      </div>
    </div>
  );
};

export default Roulette;
