import { Link } from "react-router-dom";

const Button = ({ title, linkTo }) => {
  return (
    <div className="row">
      {linkTo ? (
        <Link className="text-overlay" to={linkTo}>
          <img className="black-btn" src="/Overall UI/ButtonUp.png" alt="btn" />
          <div className="black-btn-text casino-font">{title}</div>
        </Link>
      ) : (
        <div className="text-overlay cursor">
          <img className="black-btn" src="/Overall UI/ButtonUp.png" alt="btn" />
          <div className="black-btn-text casino-font">{title}</div>
        </div>
      )}
    </div>
  );
};

export default Button;
