import { ReactComponent as ArrowIcon } from "@shared/images/arrow.svg";

import { ArrowButtonInterface } from "./interfaces";
import "./styles.scss";

export const ArrowButton = (props: ArrowButtonInterface) => {
  const getArrowDirection = () => {
    if (props.direction === "top") {
      return "arrow-button--top";
    }

    if (props.direction === "bottom") {
      return "arrow-button--bottom";
    }

    if (props.direction === "right") {
      return "arrow-button--right";
    }

    return "arrow-button";
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
