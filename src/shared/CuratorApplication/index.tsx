import { bem } from "@shared/utils/bem";

import { CuratorApplicationInterface } from "./interfaces";

import "./styles.scss";
import { CardBig } from "@shared/CardBig";

export const CuratorApplication = (props: CuratorApplicationInterface) => {

  const [block, element] = bem("curator-application");

  return (
    <div className={block()}>
      <CardBig>

      </CardBig>
    </div>
  );
};
