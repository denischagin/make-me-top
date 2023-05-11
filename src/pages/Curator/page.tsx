import { bem } from "@shared/utils/bem";
import { BackgroundProfile } from "@shared/BackgroundProfile";

import { Header } from "@widgets/Header";

import "./styles.scss";

export const Curator = () => {
  const [block, element] = bem("curator");

  return (
    <div className={block()}>
      <BackgroundProfile />
      <Header />
      <div className={element("container", "container")}></div>
    </div>
  );
};
