import { NavButtons } from "@shared/NavButtons";
import { ReactComponent as Logo } from "@shared/images/logo.svg";

import "./styles.scss";

export const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <Logo className="header__container-logo" />
        <NavButtons />
      </div>
    </div>
  );
};
