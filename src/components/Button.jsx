import { Link } from "react-router-dom";

const Button = ({ title, linkTo }) => {
  return (
    <div className="row">
      <Link className="text-overlay" to={linkTo}>
        <img className="black-btn" src="/Overall UI/ButtonUp.png" alt="btn" />
        <div className="black-btn-text casino-font">{title}</div>
      </Link>
    </div>
  );
};

export default Button;
