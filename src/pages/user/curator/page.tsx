import { bem } from "@shared/utils/bem";

import { Header } from "@widgets/Header";

import "./styles.scss";

export const Curator = () => {
  const [block, element] = bem("curator");

  return (
    <div className={block()}>
      <Header />
    </div>
  );
};
