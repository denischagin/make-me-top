import { bem } from "@shared/utils/bem";

import "./styles.scss";

export const Curators = () => {
  const [block, element] = bem("curators");

  return <div className={block()}></div>;
};
