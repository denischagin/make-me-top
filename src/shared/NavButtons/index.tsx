import { useDispatch } from "react-redux";

import { logOut } from "@/entities/user/model";
import { ReactComponent as ExitIcon } from "@/shared/images/exit.svg";

import { RouterLink } from "../buttons/Link";
import { URL_DEFAULT } from "../constants/links";
import "./styles.scss";

export const NavButtons = () => {
  const dispatch = useDispatch();

  return (
    <div className="nav-buttons">
      <RouterLink path="/explorer">
        <div className="nav-buttons__home-button">Главная</div>
      </RouterLink>
      <RouterLink path="/explorers">
        <div className="nav-buttons__explorers-button">Исследователи</div>
      </RouterLink>
      <RouterLink path="/curators">
        <div className="nav-buttons__curators-button">Хранители</div>
      </RouterLink>
      <RouterLink path={URL_DEFAULT}>
        <div
          className="nav-buttons__exit-button"
          onClick={() => dispatch(logOut())}
        >
          Выйти{" "}
          <span className="nav-buttons__exit-button-icon">
            <ExitIcon />
          </span>
        </div>
      </RouterLink>
    </div>
  );
};
