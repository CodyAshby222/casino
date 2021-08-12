import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Chips from "../components/Chips";
import "../craps.css";

const Craps = () => {
  const [chip, setChip] = useState();

  const chipHandler = (chipValue) => {
    setChip(chipValue);
  };

  return (
    <div className="main">
      <h2 className="casino-font">Craps</h2>
      <Link to="/">Go Back</Link>
      <div className="crapsBoard">
        {/* Top Section */}
        <div className="row">
          <div className="craps-btn"></div>
          <div className="craps-btn"></div>
          <div className="craps-btn"></div>
          <div className="craps-btn"></div>
          <div className="craps-btn"></div>
          <div className="craps-btn"></div>
          <div style={{ marginLeft: 32 }}>
            <div style={{ marginTop: 43 }} className="row">
              <div className="hardways-btn"></div>
              <div className="hardways-btn"></div>
            </div>
            <div className="row">
              <div className="hardways-btn"></div>
              <div className="hardways-btn"></div>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div className="row">
          <div className="field-btn"></div>
          <div style={{ marginTop: 52, marginLeft: 31 }}>
            <div className="one-long-roll-btn"></div>
            <div className="row">
              <div className="one-roll-btn"></div>
              <div className="one-roll-btn"></div>
            </div>
            <div className="row">
              <div className="one-roll-btn"></div>
              <div className="one-roll-btn"></div>
            </div>
            <div className="one-long-roll-btn"></div>
          </div>
        </div>
        <Chips setChipSelected={chipHandler} />
      </div>
    </div>
  );
};

export default Craps;
