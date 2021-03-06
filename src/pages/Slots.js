import { useContext, useState } from "react";
import { BankContext } from "../App";
import Button from "../components/Button";
import Chips from "../components/Chips";
import Rules from "../components/Rules";
import { slotsRules } from "../rules/slotsRules";
import "../slots.css";

const Slots = () => {
  const [chip, setChip] = useState(1);
  const [bank, setBank] = useContext(BankContext);
  const [slotOne, setSlotOne] = useState("Banana");
  const [slotTwo, setSlotTwo] = useState("Bars");
  const [slotThree, setSlotThree] = useState("Lemon");
  const slotImg = [
    "Banana",
    "Bars",
    "Bell",
    "Cherry",
    "Lemon",
    "Melon",
    "Orange",
    "Plum",
    "Seven",
  ];

  const chipHandler = (chipValue) => {
    setChip(chipValue);
  };

  const spin = () => {
    let slotOneImg = slotImg[Math.floor(Math.random() * 9)];
    let slotTwoImg = slotImg[Math.floor(Math.random() * 9)];
    let slotThreeImg = slotImg[Math.floor(Math.random() * 9)];
    setSlotOne(slotOneImg);
    setSlotTwo(slotTwoImg);
    setSlotThree(slotThreeImg);
    spinLogic(slotOneImg, slotTwoImg, slotThreeImg);
  };

  const spinLogic = (firstSlot, secondSlot, thirdSlot) => {
    console.log(firstSlot, secondSlot, thirdSlot);
    if (firstSlot === secondSlot && secondSlot === thirdSlot) {
      switch (firstSlot) {
        case "Banana":
          setBank((prev) => prev + chip * 3);
          break;
        case "Bars":
          setBank((prev) => prev + chip * 100);
          break;
        case "Bell":
          setBank((prev) => prev + chip * 50);
          break;
        case "Cherry":
          setBank((prev) => prev + chip * 20);
          break;
        case "Lemon":
          setBank((prev) => prev + chip);
          break;
        case "Melon":
          setBank((prev) => prev + chip * 5);
          break;
        case "Orange":
          setBank((prev) => prev + chip * 2);
          break;
        case "Plum":
          setBank((prev) => prev + chip * 10);
          break;
        case "Seven":
          setBank((prev) => prev + chip * 500);
          break;
        default:
          console.log("Error");
      }
    } else {
      setBank((prev) => prev - chip);
    }
  };

  return (
    <>
      <div style={{ marginTop: -100 }}>
        <div
          style={{ marginLeft: 425, marginTop: -175 }}
          className="slots-rules"
        >
          <Rules
            iconImg={"Slot Machine Icon"}
            modalTitle={"Slots Instructions"}
            modalBody={slotsRules}
          />
        </div>
        <div className="row">
          <div
            style={{ marginTop: 200, marginLeft: 200 }}
            className="white-text casino-font green-box"
          >
            <div className="row">
              {" "}
              <img
                className="sm-slot-img"
                src={`/Slots/Wheel - Seven.png`}
                alt="firstSlot"
              />
              <h3>- 500:1</h3>
            </div>
            <div className="row">
              {" "}
              <img
                className="sm-slot-img"
                src={`/Slots/Wheel - Bars.png`}
                alt="firstSlot"
              />
              <h3>- 100:1</h3>
            </div>
            <div className="row">
              {" "}
              <img
                className="sm-slot-img"
                src={`/Slots/Wheel - Bell.png`}
                alt="firstSlot"
              />
              <h3>- 50:1</h3>
            </div>
            <div className="row">
              {" "}
              <img
                className="sm-slot-img"
                src={`/Slots/Wheel - Cherry.png`}
                alt="firstSlot"
              />
              <h3>- 20:1</h3>
            </div>
            <div className="row">
              {" "}
              <img
                className="sm-slot-img"
                src={`/Slots/Wheel - Plum.png`}
                alt="firstSlot"
              />
              <h3>- 10:1</h3>
            </div>
            <div className="row">
              {" "}
              <img
                className="sm-slot-img"
                src={`/Slots/Wheel - Melon.png`}
                alt="firstSlot"
              />
              <h3>- 5:1</h3>
            </div>
            <div className="row">
              {" "}
              <img
                className="sm-slot-img"
                src={`/Slots/Wheel - Banana.png`}
                alt="firstSlot"
              />
              <h3>- 3:1</h3>
            </div>
            <div className="row">
              {" "}
              <img
                className="sm-slot-img"
                src={`/Slots/Wheel - Orange.png`}
                alt="firstSlot"
              />
              <h3>- 2:1</h3>
            </div>
            <div className="row">
              {" "}
              <img
                className="sm-slot-img"
                src={`/Slots/Wheel - Lemon.png`}
                alt="firstSlot"
              />
              <h3>- 1:1</h3>
            </div>
          </div>
          <div style={{ marginTop: -35 }} className="slotsBoard">
            <h1
              style={{ marginRight: 75 }}
              className="white-text casino-font text-center"
            >
              BET:
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                marginRight: 75,
              }}
            >
              <img
                className="chip"
                src={`/Overall UI/Chip${chip}.png`}
                alt="ChipLocation"
              />
            </div>

            <div style={{ marginTop: 100 }} className="row">
              <img
                style={{ marginLeft: 150 }}
                className="slot-img"
                src={`/Slots/Wheel - ${slotOne}.png`}
                alt="firstSlot"
              />
              <img
                style={{ marginLeft: 105 }}
                className="slot-img"
                src={`/Slots/Wheel - ${slotTwo}.png`}
                alt="firstSlot"
              />
              <img
                style={{ marginLeft: 105 }}
                className="slot-img"
                src={`/Slots/Wheel - ${slotThree}.png`}
                alt="firstSlot"
              />
            </div>
            <div style={{ marginTop: 100 }}>
              <Chips setChipSelected={chipHandler} />
            </div>
            <div
              style={{ textAlign: "right", marginTop: -100 }}
              className="white-text casino-font"
            >
              <h2>CHIPS:</h2>
              <h2>${bank}</h2>
            </div>
            <br />
            <div className="row-space-between main">
              <Button title={"BACK"} linkTo={"/"} />
              <div onClick={spin}>
                <Button title={"SPIN"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Slots;
