import "./styles.scss";
import { ButtonInterface } from "./interfaces";

export const ButtonBig = (props: ButtonInterface) => {
  const buttonClass = () => {
    if (props.color === "filled") {
      return "button--filled"
    }
    return "button"
  }

  return (
    <div onClick={props.action} className={buttonClass()}>{ props.title }</div>
  );
}
