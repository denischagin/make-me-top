import { bem } from "@shared/utils/bem";
import { HEADER_LINKS } from "@shared/constants/links";

import { Header } from "@widgets/Header";

import "./styles.scss";

export const Curator = () => {
  const [block, element] = bem("curator");

  return (
    <div className={block()}>
      <Header links={HEADER_LINKS}/>
      <div className={element("container", "container")}></div>
    </div>
  );
};
