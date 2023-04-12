import { bem } from "@shared/utils/bem";

import "./styles.scss";

export const DividingLine = () => {
  const [block, element] = bem("dividing-line");

  return <hr className={block()} />;
};
