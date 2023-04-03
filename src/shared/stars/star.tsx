import { ReactComponent as OrbitIcon } from "../../shared/images/orbit.svg";

import { StarInterface } from "./interfaces";
import "./styles.scss";

export const Star = (props: StarInterface) => {
  const starColor = () => {
    if (props.color === "black") {
      return "star--black";
    } else if (props.color === "white") {
      return "star--white";
    }
    return "star";
  };

  const starInfoColor = () => {
    if (props.color === "white") {
      return "star-info--black";
    }
    return "star-info";
  };

  const orbitColor = () => {
    if (props.color === "orange") {
      return "#CF5335";
    }
    return "#FBF9FF";
  };

  return (
    <div className={starColor()}>
      <div className={starInfoColor()}>
        {props.children}
        <div className="orbit">
          <OrbitIcon style={{ color: orbitColor() }}/>
        </div>
      </div>
    </div>
  );
};
