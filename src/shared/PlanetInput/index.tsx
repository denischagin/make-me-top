import { planetInputInterface } from "./interfaces";

import "./styles.scss";

export const PlanetInput = (props: planetInputInterface) => {
  return (
    <input
      type="text"
      placeholder={props.placeholder}
      className="planet-input"
    />
  );
};
