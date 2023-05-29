import { bem } from "@shared/utils/bem";

import { PlanetButtonInterface } from "./interfaces";

import "./styles.scss";

export const PlanetButton = (props: PlanetButtonInterface) => {
  const [block, element] = bem("planet-button");

  return (
    <div
      onClick={props.action}
      className={block()}
    >
      {props.title}
    </div>
  );
};
