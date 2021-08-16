import { useEffect, useState } from "react";
import Button from "../components/Button";
import Chips from "../components/Chips";
import Rules from "../components/Rules";
import "../craps.css";
import { crapsRules } from "../rules/crapsRules";

const Craps = () => {
  const [chip, setChip] = useState(1);
  const [chipLocation, setChipLocation] = useState();
  const [dieOne, setDieOne] = useState();
  const [dieTwo, setDieTwo] = useState();

  useEffect(() => {}, []);

  const crapsBtns = new Array(6).fill("craps-btn");

  const chipHandler = (chipValue) => {
    setChip(chipValue);
  };

  const handleChipLocation = (currentLocation, chipClass) => {
    return (
      <>
        {chip && chipLocation === currentLocation ? (
          <img
            className={chipClass}
            src={`/Overall UI/Chip${chip}.png`}
            alt="ChipLocation"
          />
        ) : null}
      </>
    );
  };

  const rollDice = () => {
    //Dice Values
    let dieOneNum = Math.floor(Math.random() * 6) + 1;
    let dieTwoNum = Math.floor(Math.random() * 6) + 1;
    let dieTotal = dieOneNum + dieTwoNum;
    setDieOne(dieOneNum);
    setDieTwo(dieTwoNum);

    //Location and Logic
    const hardwaysArr = ["twos", "threes", "fours", "fives"];
    const oneRollArr = ["anyCraps", 7, 3, 11, 2, 12];

    if (chipLocation.toString().includes("craps-btn")) {
      rowLogic(dieTotal);
    } else if (chipLocation === "craps-field") {
      fieldLogic(dieTotal);
    } else if (hardwaysArr.includes(chipLocation)) {
      hardwaysLogic(dieOneNum, dieTwoNum, dieTotal);
    } else if (oneRollArr.includes(chipLocation)) {
      oneRollLogic(dieOneNum, dieTwoNum, dieTotal);
    } else {
      //Chip hasn't been placed
    }
  };

  const rowLogic = (dieTotal) => {
    console.log("IM ON ROW");
    //1:2?
  };

  const fieldLogic = (dieTotal) => {
    console.log("IM ON FIELD");
    // 1:1 on 3,4,9,10,11... 2:1 on 2... 3:1 on 12
  };

  const hardwaysLogic = (dieOne, dieTwo, dieTotal) => {
    console.log("IM ON HARDWAYS");
    //Keep until same num or craps hit?
  };

  const oneRollLogic = (dieOne, dieTwo, dieTotal) => {
    console.log("I ON ONE BEt");
    //Roll and Reset Roll
  };

  return (
    <>
      <div style={{ marginTop: -125 }} className="main">
        <div className="craps-rules">
          <Rules
            iconImg={"Craps Icon"}
            modalTitle={"Craps Instructions"}
            modalBody={crapsRules}
          />
        </div>
        <div className="crapsBoard">
          {/* Top Section */}
          <div className="row">
            {crapsBtns.map((btn, index) => {
              return (
                <div
                  key={`${btn}_${index}`}
                  onClick={() => setChipLocation(`${btn}${index}`)}
                  className={`${btn} craps-center`}
                >
                  {handleChipLocation(`${btn}${index}`, "craps-middle-chip")}
                </div>
              );
            })}
            <div style={{ marginLeft: 32 }}>
              <div style={{ marginTop: 43 }} className="row">
                <div
                  onClick={() => setChipLocation("twos")}
                  className="hardways-btn craps-center"
                >
                  {handleChipLocation("twos", "craps-chip")}
                </div>
                <div
                  onClick={() => setChipLocation("fives")}
                  className="hardways-btn craps-center"
                >
                  {handleChipLocation("fives", "craps-chip")}
                </div>
              </div>
              <div className="row">
                <div
                  onClick={() => setChipLocation("threes")}
                  className="hardways-btn craps-center"
                >
                  {handleChipLocation("threes", "craps-chip")}
                </div>
                <div
                  onClick={() => setChipLocation("fours")}
                  className="hardways-btn craps-center"
                >
                  {handleChipLocation("fours", "craps-chip")}
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="row">
            <div>
              <div className="craps-dice row-center">
                {dieOne && dieTwo ? (
                  <>
                    <img
                      className="craps-die"
                      src={`/Overall UI/Dice${dieOne}.png`}
                      alt="dieOne"
                    />
                    <img
                      className="craps-die"
                      src={`/Overall UI/Dice${dieTwo}.png`}
                      alt="dieTwo"
                    />
                    {dieOne}
                  </>
                ) : null}
              </div>
              <div
                onClick={() => setChipLocation("craps-field")}
                className="field-btn craps-center"
              >
                {handleChipLocation("craps-field", "craps-middle-chip")}
              </div>
            </div>
            <div style={{ marginTop: 52, marginLeft: 31 }}>
              <div
                onClick={() => setChipLocation(7)}
                className="one-long-roll-btn craps-center"
              >
                {handleChipLocation(7, "craps-chip")}
              </div>
              <div className="row">
                <div
                  onClick={() => setChipLocation(3)}
                  className="one-roll-btn craps-center"
                >
                  {handleChipLocation(3, "craps-chip")}
                </div>
                <div
                  onClick={() => setChipLocation(11)}
                  className="one-roll-btn craps-center"
                >
                  {handleChipLocation(11, "craps-chip")}
                </div>
              </div>
              <div className="row">
                <div
                  onClick={() => setChipLocation(2)}
                  className="one-roll-btn craps-center"
                >
                  {handleChipLocation(2, "craps-chip")}
                </div>
                <div
                  onClick={() => setChipLocation(12)}
                  className="one-roll-btn craps-center"
                >
                  {handleChipLocation(12, "craps-chip")}
                </div>
              </div>
              <div
                onClick={() => setChipLocation("anyCraps")}
                className="one-long-roll-btn craps-center"
              >
                {handleChipLocation("anyCraps", "craps-chip")}
              </div>
            </div>
          </div>
          <Chips setChipSelected={chipHandler} />
          <br />
          <div className="row-space-between">
            <Button title={"BACK"} linkTo={"/"} />
            {chipLocation ? (
              <div onClick={rollDice}>
                <Button title={"ROLL"} />
              </div>
            ) : (
              <div className="text-overlay cursor">
                <img
                  className="black-btn"
                  src="/Overall UI/ButtonUp.png"
                  alt="btn"
                />
                <div className="transparent-roll-img transparent-btn-text casino-font">
                  ROLL
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Craps;
