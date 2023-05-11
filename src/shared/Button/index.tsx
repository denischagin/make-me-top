import { bem } from "@shared/utils/bem";

import { ButtonInterface } from "./interfaces";

import "./styles.scss";

export const Button = (props: ButtonInterface) => {
  const [block, element] = bem("button");

  return (
    <div
      onClick={props.action}
      className={block({
        color: props.color,
        size: props.size,
      })}
    >
      {props.title}
    </div>
  );
};
