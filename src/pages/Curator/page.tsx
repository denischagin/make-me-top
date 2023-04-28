import { bem } from "@shared/utils/bem";

import { Header } from "@widgets/Header";

import { LINKS } from "./model";

import "./styles.scss";

export const Curator = () => {
  const [block, element] = bem("curator");

  return (
    <div className={block()}>
      <Header links={LINKS}/>
      <div className={element("container", "container")}></div>
    </div>
  );
};
