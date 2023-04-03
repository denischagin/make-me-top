import { ButtonInterface } from "./interfaces";
import "./styles.scss";

export const ButtonSmall = (props: ButtonInterface) => {
  const buttonClass = () => {
    if (props.color === "filled") {
      return "button-small--filled";
    }

    if (props.color === "black") {
      return "button-small--black";
    }

    if (props.color === "orange") {
      return "button-small--orange";
    }

    return "button-small";
  };

  return (
    <div
      onClick={props.action}
      className={buttonClass()}
    >
      {props.title}
    </div>
  );
};
