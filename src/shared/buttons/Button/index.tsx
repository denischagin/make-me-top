import { ButtonInterface } from "./interfaces";
import "./styles.scss";

export const Button = (props: ButtonInterface) => {
  const getButtonColor = () => {
    if (props.color === "filled") {
      return "button button--filled";
    }

    if (props.color === "black") {
      return "button button--black";
    }

    if (props.color === "orange") {
      return "button button--orange";
    }

    return "button";
  };

  const getButtonClass = () => {
    if (props.size === "small") {
      return `${getButtonColor()} button--small`;
    }

    return `${getButtonColor()} button--large`;
  };

  return (
    <div
      onClick={props.action}
      className={getButtonClass()}
    >
      {props.title}
    </div>
  );
};
