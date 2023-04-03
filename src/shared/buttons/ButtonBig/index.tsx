import { ButtonInterface } from "./interfaces";
import "./styles.scss";

export const ButtonBig = (props: ButtonInterface) => {
  const buttonClass = () => {
    if (props.color === "filled") {
      return "button-big--filled";
    }

    if (props.color === "black") {
      return "button-big--black";
    }

    if (props.color === "orange") {
      return "button-big--orange";
    }

    return "button-big";
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
