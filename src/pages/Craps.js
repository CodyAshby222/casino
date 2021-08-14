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
    setDieOne(Math.floor(Math.random() * 6) + 1);
    setDieTwo(Math.floor(Math.random() * 6) + 1);
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
            <div onClick={rollDice}>
              <Button title={"ROLL"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Craps;
