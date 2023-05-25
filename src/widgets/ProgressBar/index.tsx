import { ReactComponent as RocketIcon } from "@shared/images/rocket.svg";

import { bem } from "@shared/utils/bem";
import { ProgressInterface } from "./interfaces";

import "./styles.scss";

export const ProgressBar = (props: ProgressInterface) => {
  const [block, element] = bem("progress-bar");

  const progressStyle = {
    width: `${props.progress}%`,
  };

  return (
    <div className={block()}>
      <span className={element("left-dot")}/>
      <div
        className={element("container")}
        style={progressStyle}
      >
        <span className={element("line")}>
          <RocketIcon className={element("icon")}/>
        </span>
      </div>
      <span className={element("right-dot")}/>
    </div>
  );
};