import { bem } from "@shared/utils/bem";

import { PlanetButtonInterface } from "./interfaces";

import "./styles.scss";

export const PlanetButton = (props: PlanetButtonInterface) => {
  const {
    title,
    onClick
  } = props;

  const [block, element] = bem("planet-button");

  return (
    <div
      onClick={onClick}
      className={block()}
    >
      {title}
    </div>
  );
};
