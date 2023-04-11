import { ReactComponent as OrbitIcon } from "@shared/images/orbit.svg";

import { StarInterface } from "./interfaces";
import "./styles.scss";

export const Star = (props: StarInterface) => {
  const starColor = () => {
    switch (props.color) {
    case "black":
      return "star star--black";
    case "white":
      return "star star--white";
    default:
      return "star star--primary-500";
    }
  };

  const starInfoColor = () => {
    if (props.color === "black") {
      return "star-info star-info--black";
    }
    return "star-info";
  };

  const orbitColor = () => {
    if (props.color === "primary-500") {
      return "#CF5335";
    }
    return "#FBF9FF";
  };

  return (
    <div className={starColor()}>
      <div className={starInfoColor()}>
        {props.children}
        <div className="orbit">
          <OrbitIcon style={{ color: orbitColor() }} />
        </div>
      </div>
    </div>
  );
};
