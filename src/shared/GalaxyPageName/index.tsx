import React from "react";

import "./styles.scss";
import {bem} from "@shared/utils/bem";

interface IGalaxyPageName {
  galaxyName: string;
}

const GalaxyPageName: React.FC<IGalaxyPageName> = (props) => {
  const { galaxyName } = props;

  const [block, element] = bem("galaxy-page-name");

  return (
    <div className={block()}>
      <div className={element("page-context")}>Галактика</div>
      <div className={element(("galaxy-name"))}>{galaxyName}</div>
    </div>
  );
};

export default GalaxyPageName;