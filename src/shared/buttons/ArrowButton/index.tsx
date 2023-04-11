import { ReactComponent as ArrowIcon } from "@shared/images/arrow.svg";

import { ArrowButtonInterface } from "./interfaces";
import "./styles.scss";

export const ArrowButton = (props: ArrowButtonInterface) => {
  const getArrowDirection = () => {
    switch (props.direction) {
      case "top":
        return "arrow-button arrow-button--top";
      case "bottom":
        return "arrow-button arrow-button--bottom";
      case "right":
        return "arrow-button arrow-button--right";
      default:
        return "arrow-button arrow-button--left";
    }
  };

  return (
    <div
      onClick={props.action}
      className={getArrowDirection()}
    >
      <ArrowIcon className="arrow-button__arrow" />
      <div className="arrow-button__circle" />
    </div>
  );
};
