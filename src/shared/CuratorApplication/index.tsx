import { bem } from "@shared/utils/bem";

import { CuratorApplicationInterface } from "./interfaces";

import "./styles.scss";

export const CuratorApplication = (props: CuratorApplicationInterface) => {

  const [block, element] = bem("curator-application");

  return (
    <div className={block()}>
    </div>
  );
};
