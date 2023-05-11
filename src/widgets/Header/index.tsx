import { NavButtons } from "@shared/NavButtons";
import { ReactComponent as Logo } from "@shared/images/logo.svg";
import { bem } from "@shared/utils/bem";

import "./styles.scss";

export const Header = () => {
  const [block, element] = bem("header");

  return (
    <div className={block()}>
      <div className={element("container", "container")}>
        <Logo className={element("logo")} />
        <NavButtons />
      </div>
    </div>
  );
};
