import { ReactComponent as ArrowIcon } from "@shared/images/arrow.svg";
import { bem } from "@shared/utils/bem";

import { ArrowButtonInterface } from "./interfaces";
import "./styles.scss";

export const ArrowButton = (props: ArrowButtonInterface) => {
  const [block, element] = bem("arrow-button");

  return (
    <div
      onClick={props.action}
      className={block({ direction: props.direction })}
    >
      <ArrowIcon className={element("arrow")} />
      <div className={element("circle")} />
    </div>
  );
};
