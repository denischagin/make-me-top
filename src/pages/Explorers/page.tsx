import { BackgroundUsersList } from "@shared/BackgroundUsersList";

import { HEADER_LINKS } from "@shared/constants/links";

import { bem } from "@shared/utils/bem";

import { Header } from "@widgets/Header";

import "./styles.scss";

export const Explorers = () => {
  const [block, element] = bem("explorers");

  return (
    <div className={block()}>
      <BackgroundUsersList />
      <Header links={HEADER_LINKS}/>
    </div>
  );
};
