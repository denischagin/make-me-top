import { bem } from "@shared/utils/bem";

import "./styles.scss";

export const Explorers = () => {
  const [block, element] = bem("explorers");

  return <div className={block()}></div>;
};
