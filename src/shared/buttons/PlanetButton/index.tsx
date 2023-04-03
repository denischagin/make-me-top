import { PlanetButtonInterface } from "./interfaces";
import "./styles.scss";

export const PlanetButton = (props: PlanetButtonInterface) => {
  return (
    <div
      onClick={props.action}
      className="planet-button"
    >
      {props.title}
    </div>
  );
};
