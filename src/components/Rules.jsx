import { useState } from "react";
import Modal from "react-modal";

const Rules = ({ iconImg, modalTitle, modalBody }) => {
  const [showRules, setShowRules] = useState(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#ffffff",
      padding: 20,
      marginTop: 50,
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
  };

  return (
    <>
      <img className="sm-icon" src={`/Overall UI/${iconImg}.png`} alt="Craps" />
      <div
        className="rules-btn text-overlay cursor"
        onClick={() => setShowRules(true)}
      >
        <img
          className="rules-btn-img"
          src="/Overall UI/ButtonUp.png"
          alt="btn"
        />
        <div className="rules-txt casino-font">RULES</div>
      </div>
      <Modal
        isOpen={showRules}
        ariaHideApp={false}
        onRequestClose={() => setShowRules(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          onClick={() => setShowRules(false)}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "red",
            fontSize: 30,
          }}
          className="casino-font cursor"
        >
          X
        </div>
        <h2 style={{ letterSpacing: 2, marginTop: 0 }} className="casino-font">
          {modalTitle}
        </h2>
        {modalBody?.length > 0
          ? modalBody.map((p, i) => {
              return (
                <div key={`Sentence_${p}_${i}`}>
                  <div className="casino-font">{p}</div>
                  <br />
                </div>
              );
            })
          : null}
      </Modal>
    </>
  );
};

export default Rules;
