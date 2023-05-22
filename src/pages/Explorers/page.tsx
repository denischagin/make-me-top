import { Header } from "@widgets/Header";

import { bem } from "@shared/utils/bem";

import { BackgroundUsersList } from "@shared/BackgroundUsersList";

import "./styles.scss";

export const Explorers = () => {
  const [block, element] = bem("explorers");

  return (
    <div className={block()}>
      <BackgroundUsersList />
      <Header />
    </div>
  );
};
