import { useAppDispatch } from "@app/providers/store/hooks";
import { logOut } from "@entities/user/model";
import { RouterLink } from "@shared/buttons/Link";

import {
  URL_CURATORS,
  URL_DEFAULT,
  URL_EXPLORER,
  URL_EXPLORERS,
} from "../constants/links";
import { ReactComponent as ExitIcon } from "../images/exit.svg";
import "./styles.scss";

export const NavButtons = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="nav-buttons">
      <RouterLink path={URL_EXPLORER}>
        <div className="nav-buttons__home-button">Главная</div>
      </RouterLink>
      <RouterLink path={URL_EXPLORERS}>
        <div className="nav-buttons__explorers-button">Исследователи</div>
      </RouterLink>
      <RouterLink path={URL_CURATORS}>
        <div className="nav-buttons__curators-button">Хранители</div>
      </RouterLink>
      <RouterLink path={URL_DEFAULT}>
        <div
          className="nav-buttons__exit-button"
          onClick={() => dispatch(logOut())}
        >
          Выйти
          <span className="nav-buttons nav-buttons__exit-icon">
            <ExitIcon />
          </span>
        </div>
      </RouterLink>
    </div>
  );
};
