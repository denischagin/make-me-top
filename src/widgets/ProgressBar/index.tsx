import { ReactComponent as RocketIcon } from "@shared/images/rocket.svg";

import { bem } from "@shared/utils/bem";

import "./styles.scss";

export const ProgressBar = () => {
  const [block, element] = bem("progress-bar");

  return (
    <div className={block()}>
      <div className={element("icon")}>
        <RocketIcon />
      </div>
      <div className={element("dot")} />
      <div className={element("line")} />
      <div className={element("dot")} />
    </div>
  );
};
