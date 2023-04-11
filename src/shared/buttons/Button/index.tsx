import { ButtonInterface } from "./interfaces";
import "./styles.scss";

export const Button = (props: ButtonInterface) => {
  const getButtonColor = () => {
    switch (props.color) {
      case "filled":
        return "button button--filled";
      case "black":
        return "button button--black";
      case "primary-500":
        return "button button--primary-500";
      default:
        return "button";
    }
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
