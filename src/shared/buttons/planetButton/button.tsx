import "./styles.scss";
import { PlanetButtonInterface } from "./interfaces";

export const PlanetButton = (props: PlanetButtonInterface) => {
  return (
    <div onClick={props.action} className="planet-button">{ props.title }</div>
  );
}
