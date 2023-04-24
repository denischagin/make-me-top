import { useAppDispatch } from "@app/providers/store/hooks";

import { RouterLink } from "@shared/Link";

import { logOut } from "@entities/user/model";

import {
  URL_CURATORS,
  URL_DEFAULT,
  URL_EXPLORER,
  URL_EXPLORERS,
} from "../constants/links";

import { Typography } from "../Typography";
import { ReactComponent as ExitIcon } from "../images/exit.svg";

import "./styles.scss";

export const NavButtons = () => {
  const dispatch = useAppDispatch();

  return (
    <div className="nav-buttons">
      <RouterLink path={URL_EXPLORER}>
        <div className="nav-buttons__home-button">
          <Typography variant="regular14">Главная</Typography>
        </div>
      </RouterLink>
      <RouterLink path={URL_EXPLORERS}>
        <div className="nav-buttons__explorers-button">
          <Typography variant="regular14">Исследователи</Typography>
        </div>
      </RouterLink>
      <RouterLink path={URL_CURATORS}>
        <div className="nav-buttons__curators-button">
          <Typography variant="regular14">Хранители</Typography>
        </div>
      </RouterLink>
      <RouterLink path={URL_DEFAULT}>
        <div
          className="nav-buttons__exit-button"
          onClick={() => dispatch(logOut())}
        >
          <Typography variant="regular14">Выйти</Typography>
          <span className="nav-buttons nav-buttons__exit-icon">
            <ExitIcon />
          </span>
        </div>
      </RouterLink>
    </div>
  );
};
