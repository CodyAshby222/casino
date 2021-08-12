const Chips = ({ setChipSelected }) => {
  const allChips = [1, 5, 10, 20, 50, 100, 500, 1000, 5000];

  return (
    <div className="row-center">
      {allChips.map((chip, index) => {
        return (
          <img
            className="chip"
            onClick={() => setChipSelected(chip)}
            src={`/Overall UI/Chip${chip}.png`}
            alt={`Chip_${chip}`}
          />
        );
      })}
    </div>
  );
};

export default Chips;
