import { Link } from "react-router-dom";
import "../roulette.css";

import roulletteWheel from "../Roulette/RouletteWheel_SingleZero.png";

import { rouletterNumbers } from "../components/roulletteWheel";
import { useContext, useState } from "react";
import { BankContext } from "../App";
import Chips from "../components/Chips";

const Roulette = () => {
  const [degrees, setdegrees] = useState(1000);
  const [wheelNum, setWheenNum] = useState(0);
  const [chip, setChip] = useState(1);
  const [chipLocation, setChipLocation] = useState(null);
  const [bank, setBank] = useContext(BankContext);

  const spinWheel = (extraValue) => {
    const wheel = document.getElementById("Wheel");
    setdegrees(extraValue);

    wheel.style.transitionDuration = "5s";
    wheel.style.transform = `rotate(${degrees}deg)`;
    getNum();
  };

  const getNum = () => {
    let wheelNum = Math.floor(Math.random() * 36);
    let wheelPosition = rouletterNumbers[wheelNum];
    console.log(chipLocation);
    console.log(bank);
    setWheenNum(wheelPosition);
    checkBet();
  };

  const checkBet = () => {
    console.log(wheelNum);
    let payout;
    if (chipLocation === wheelNum.num) {
      console.log("single num bet");

      payout = chip * 35 + chip;
      setBank(bank + payout);
      setChipLocation(null);
    }
    if (
      (chipLocation === "2To1-1" && wheelNum.num === 3) ||
      wheelNum.num === 6 ||
      wheelNum.num === 9 ||
      wheelNum.num === 12 ||
      wheelNum.num === 15 ||
      wheelNum.num === 18 ||
      wheelNum.num === 21 ||
      wheelNum.num === 24 ||
      wheelNum.num === 27 ||
      wheelNum.num === 30 ||
      wheelNum.num === 33 ||
      wheelNum.num === 36
    ) {
      console.log("2to one bet row 1");

      payout = chip * 2 + chip;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (
      (chipLocation === "2To1-2" && wheelNum === 2) ||
      wheelNum.num === 5 ||
      wheelNum.num === 8 ||
      wheelNum.num === 11 ||
      wheelNum.num === 14 ||
      wheelNum.num === 17 ||
      wheelNum.num === 20 ||
      wheelNum.num === 23 ||
      wheelNum.num === 26 ||
      wheelNum.num === 29 ||
      wheelNum.num === 32 ||
      wheelNum.num === 35
    ) {
      console.log("2to one bet row 2");

      payout = chip * 2 + chip;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (
      (chipLocation === "2To1-3" && wheelNum === 1) ||
      wheelNum.num === 4 ||
      wheelNum.num === 7 ||
      wheelNum.num === 10 ||
      wheelNum.num === 13 ||
      wheelNum.num === 16 ||
      wheelNum.num === 19 ||
      wheelNum.num === 22 ||
      wheelNum.num === 25 ||
      wheelNum.num === 28 ||
      wheelNum.num === 31 ||
      wheelNum.num === 34
    ) {
      console.log("2to one bet row 3");
      payout = chip * 2 + chip;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (
      (chipLocation === "1To12" && wheelNum.num >= 1) ||
      wheelNum.num <= 12
    ) {
      console.log("first 12");
      payout = chip * 2 + chip;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (
      (chipLocation === "2nd12" && wheelNum.num >= 13) ||
      wheelNum.num <= 24
    ) {
      console.log("second 12");
      payout = chip * 2 + chip;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (
      (chipLocation === "3rd12" && wheelNum.num >= 25) ||
      wheelNum.num <= 36
    ) {
      console.log("third tweleve");
      payout = chip * 2 + chip;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (
      (chipLocation === "1To18" && wheelNum.num >= 1) ||
      wheelNum.num <= 18
    ) {
      console.log("first 18");
      payout = chip * 2;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (
      (chipLocation === "19to36" && wheelNum.num >= 19) ||
      wheelNum.num <= 36
    ) {
      console.log("19 to 36");
      payout = chip * 2;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (chipLocation === "Even" && wheelNum.num % 2 === 0) {
      console.log("even");
      payout = chip * 2;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (chipLocation === "ODD" && wheelNum.num % 2 !== 0) {
      console.log("ODD");
      payout = chip * 2;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (chipLocation === "RED" && wheelNum.color === "red") {
      console.log("red bet");
      payout = chip * 2;
      setBank(bank + payout);
      setChipLocation(null);
    } else if (chipLocation === "BLACK" && wheelNum.color === "black") {
      console.log("black bet");
      payout = chip * 2;
      setBank(bank + payout);
      setChipLocation(null);
    } else {
      setChip(null);
      setChipLocation(null);
    }
  };

  const handleChipLocation = (location) => {
    console.log(location);
    if (!chipLocation) {
      setBank((prev) => prev - chip);
    }
    setChipLocation(location);
  };

  const handleClick = (location) => {
    return (
      <>
        {chip && chipLocation === location ? (
          <img className="chipR" src={`/Overall UI/Chip${chip}.png`} />
        ) : null}
      </>
    );
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
            <div className="zero" id="0" onClick={() => handleChipLocation(0)}>
              {handleClick(0)}
            </div>
            <div className="rowRs">
              <div className="rowR">
                <div
                  className="betOption"
                  id="3"
                  onClick={() => handleChipLocation(3)}
                >
                  {handleClick(3)}
                </div>
                <div
                  className="betOption"
                  id="6"
                  onClick={() => handleChipLocation(6)}
                >
                  {handleClick(6)}
                </div>
                <div
                  className="betOption"
                  id="9"
                  onClick={() => handleChipLocation(9)}
                >
                  {handleClick(9)}
                </div>
                <div
                  className="betOption"
                  id="12"
                  onClick={() => handleChipLocation(12)}
                >
                  {handleClick(12)}
                </div>
                <div
                  className="betOption"
                  id="15"
                  onClick={() => handleChipLocation(15)}
                >
                  {handleClick(15)}
                </div>
                <div
                  className="betOption"
                  id="18"
                  onClick={() => handleChipLocation(18)}
                >
                  {handleClick(18)}
                </div>
                <div
                  className="betOption"
                  id="21"
                  onClick={() => handleChipLocation(21)}
                >
                  {handleClick(21)}
                </div>
                <div
                  className="betOption"
                  id="24"
                  onClick={() => handleChipLocation(24)}
                >
                  {handleClick(24)}
                </div>
                <div
                  className="betOption"
                  id="27"
                  onClick={() => handleChipLocation(27)}
                >
                  {handleClick(27)}
                </div>
                <div
                  className="betOption"
                  id="30"
                  onClick={() => handleChipLocation(30)}
                >
                  {handleClick(30)}
                </div>
                <div
                  className="betOption"
                  id="33"
                  onClick={() => handleChipLocation(33)}
                >
                  {handleClick(33)}
                </div>
                <div
                  className="betOption"
                  id="36"
                  onClick={() => handleChipLocation(36)}
                >
                  {handleClick(36)}
                </div>
              </div>
              <div className="rowR">
                <div
                  className="betOption"
                  id="2"
                  onClick={() => handleChipLocation(2)}
                >
                  {handleClick(2)}
                </div>
                <div
                  className="betOption"
                  id="5"
                  onClick={() => handleChipLocation(5)}
                >
                  {handleClick(5)}
                </div>
                <div
                  className="betOption"
                  id="8"
                  onClick={() => handleChipLocation(8)}
                >
                  {handleClick(8)}
                </div>
                <div
                  className="betOption"
                  id="11"
                  onClick={() => handleChipLocation(11)}
                >
                  {handleClick(11)}
                </div>
                <div
                  className="betOption"
                  id="14"
                  onClick={() => handleChipLocation(14)}
                >
                  {handleClick(14)}
                </div>
                <div
                  className="betOption"
                  id="17"
                  onClick={() => handleChipLocation(17)}
                >
                  {handleClick(17)}
                </div>
                <div
                  className="betOption"
                  id="20"
                  onClick={() => handleChipLocation(20)}
                >
                  {handleClick(20)}
                </div>
                <div
                  className="betOption"
                  id="23"
                  onClick={() => handleChipLocation(23)}
                >
                  {handleClick(23)}
                </div>
                <div
                  className="betOption"
                  id="26"
                  onClick={() => handleChipLocation(26)}
                >
                  {handleClick(26)}
                </div>
                <div
                  className="betOption"
                  id="29"
                  onClick={() => handleChipLocation(29)}
                >
                  {handleClick(29)}
                </div>
                <div
                  className="betOption"
                  id="32"
                  onClick={() => handleChipLocation(32)}
                >
                  {handleClick(32)}
                </div>
                <div
                  className="betOption"
                  id="35"
                  onClick={() => handleChipLocation(35)}
                >
                  {handleClick(35)}
                </div>
              </div>
              <div className="rowR">
                <div
                  className="betOption"
                  id="1"
                  onClick={() => handleChipLocation(1)}
                >
                  {" "}
                  {handleClick(1)}
                </div>
                <div
                  className="betOption"
                  id="4"
                  onClick={() => handleChipLocation(4)}
                >
                  {" "}
                  {handleClick(4)}
                </div>
                <div
                  className="betOption"
                  id="7"
                  onClick={() => handleChipLocation(7)}
                >
                  {" "}
                  {handleClick(7)}
                </div>
                <div
                  className="betOption"
                  id="10"
                  onClick={() => handleChipLocation(10)}
                >
                  {" "}
                  {handleClick(10)}
                </div>
                <div
                  className="betOption"
                  id="13"
                  onClick={() => handleChipLocation(13)}
                >
                  {" "}
                  {handleClick(13)}
                </div>
                <div
                  className="betOption"
                  id="16"
                  onClick={() => handleChipLocation(16)}
                >
                  {" "}
                  {handleClick(16)}
                </div>
                <div
                  className="betOption"
                  id="19"
                  onClick={() => handleChipLocation(19)}
                >
                  {" "}
                  {handleClick(19)}
                </div>
                <div
                  className="betOption"
                  id="22"
                  onClick={() => handleChipLocation(22)}
                >
                  {" "}
                  {handleClick(22)}
                </div>
                <div
                  className="betOption"
                  id="25"
                  onClick={() => handleChipLocation(25)}
                >
                  {" "}
                  {handleClick(25)}
                </div>
                <div
                  className="betOption"
                  id="28"
                  onClick={() => handleChipLocation(28)}
                >
                  {" "}
                  {handleClick(28)}
                </div>
                <div
                  className="betOption"
                  id="31"
                  onClick={() => handleChipLocation(31)}
                >
                  {" "}
                  {handleClick(31)}
                </div>
                <div
                  className="betOption"
                  id="34"
                  onClick={() => handleChipLocation(34)}
                >
                  {" "}
                  {handleClick(34)}
                </div>
              </div>
            </div>
            <div className="twoToOneBet">
              <div
                className="OneToTwoOption"
                id="2To1-1"
                onClick={() => handleChipLocation("2To1-1")}
              >
                {handleClick("2To1-1")}
              </div>
              <div
                className="OneToTwoOption"
                id="2To1-2"
                onClick={() => handleChipLocation("2To1-2")}
              >
                {handleClick("2To1-2")}
              </div>
              <div
                className="OneToTwoOption"
                id="2To1-3"
                onClick={() => handleChipLocation("2To1-3")}
              >
                {handleClick("2To1-3")}
              </div>
            </div>
          </div>
          <div className="betOptions">
            <div className="columnOne">
              <div
                className="oneToTwelve"
                id="1To12"
                onClick={() => handleChipLocation("1To12")}
              >
                {handleClick("1To12")}
              </div>
              <div className="betOptions2">
                <div
                  className="bottomBets"
                  id="1To18"
                  onClick={() => handleChipLocation("1To18")}
                >
                  {handleClick("1To18")}
                </div>
                <div
                  className="bottomBets"
                  id="Even"
                  onClick={() => handleChipLocation("Even")}
                >
                  {handleClick("Even")}
                </div>
              </div>
            </div>
            <div className="columnOne margin">
              <div
                className="oneToTwelve"
                id="2nd12"
                onClick={() => handleChipLocation("2nd12")}
              >
                {handleClick("2nd12")}
              </div>
              <div className="betOptions2">
                <div
                  className="bottomBets"
                  id="RED"
                  onClick={() => handleChipLocation("RED")}
                >
                  {handleClick("RED")}
                </div>
                <div
                  className="bottomBets"
                  id="BLACK"
                  onClick={() => handleChipLocation("BLACK")}
                >
                  {handleClick("BLACK")}
                </div>
              </div>
            </div>
            <div className="columnOne margin">
              <div
                className="oneToTwelve"
                id="3rd12"
                onClick={() => handleChipLocation("3rd12")}
              >
                {handleClick("3rd12")}
              </div>
              <div className="betOptions2">
                <div
                  className="bottomBets"
                  id="ODD"
                  onClick={() => handleChipLocation("ODD")}
                >
                  {handleClick("ODD")}
                </div>
                <div
                  className="bottomBets"
                  id="19to36"
                  onClick={() => handleChipLocation("19to36")}
                >
                  {handleClick("19to36")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="roullette__button">
        <div className="R_Button" onClick={() => spinWheel(degrees + 1200)}>
          Spin
        </div>
        {wheelNum !== null ? (
          <div className="rolledOption">
            <h1 style={{ color: "white" }}>{wheelNum.num}</h1>
            <h1 style={{ color: "white" }}>{wheelNum.color}</h1>
          </div>
        ) : (
          <div></div>
        )}

        <div>
          <h1 style={{ color: "#ffff" }}>${bank}</h1>
        </div>
      </div>
      <Chips setChipSelected={(chip) => setChip(chip)} />
    </div>
  );
};

export default Roulette;
