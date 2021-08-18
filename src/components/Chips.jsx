import { useState } from "react";

const Chips = ({ setChipSelected }) => {
  const allChips = [1, 5, 10, 20, 50, 100, 500, 1000, 5000];
  const [chips, setChips] = useState(() => {
    let chipArray = new Array(9).fill("");
    chipArray[0] = "X";
    return chipArray;
  });

  const handleClick = (index) => {
    let chipArray = new Array(9).fill("");
    chipArray[index] = "X";
    setChips(chipArray);
  };

  return (
    <>
      <div className="row-center">
        {chips.map((chip, index) => {
          return (
            <div key={`Arrow_${chip}_${index}`}>
              {chip ? (
                <img
                  className="down-arrow"
                  src="/Overall UI/ArrowDown.png"
                  alt={`Chip_${chip}`}
                />
              ) : (
                <div className="chip"></div>
              )}
            </div>
          );
        })}
      </div>
      <div className="row-center">
        {allChips.map((chip, index) => {
          return (
            <img
              key={`Chip_${chip}_${index}`}
              className="chip"
              onClick={() => {
                setChipSelected(chip);
                handleClick(index);
              }}
              src={`/Overall UI/Chip${chip}.png`}
              alt={`Chip_${chip}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default Chips;
