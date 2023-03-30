import "./styles.scss";
import { planetInputInterface } from "./interfaces";

export const PlanetInput = (props: planetInputInterface) => {
  return (
    <input type="text" placeholder={props.placeholder} className="planet-input"/>
  );
}
