import { BackgroundUsersList } from "@shared/BackgroundUsersList";

import { HEADER_LINKS } from "@shared/constants/links";

import { bem } from "@shared/utils/bem";

import { Header } from "@widgets/Header";

import "./styles.scss";

export const Curators = () => {
  const [block, element] = bem("curators");

  return (
    <div className={block()}>
      <BackgroundUsersList />
      <Header links={HEADER_LINKS} />
    </div>
  );
};
