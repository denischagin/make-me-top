import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { logOut } from "@/entities/user/model";

import { ReactComponent as ExitIcon } from "../images/exit.svg";
import "./styles.scss";

export const NavButtons = () => {
  const dispatch = useDispatch();

  return (
    <div className="nav-buttons">
      <Link to="/explorer">
        <div className="nav-buttons__home-button">Главная</div>
      </Link>
      <Link to="/explorers">
        <div className="nav-buttons__explorers-button">Исследователи</div>
      </Link>
      <Link to="/curators">
        <div className="nav-buttons__curators-button">Хранители</div>
      </Link>
      <Link to="/">
        <div
          className="nav-buttons__exit-button"
          onClick={() => dispatch(logOut())}
        >
          Выйти{" "}
          <span className="nav-buttons__exit-button-icon">
            <ExitIcon />
          </span>
        </div>
      </Link>
    </div>
  );
};
