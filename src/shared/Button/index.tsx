import { bem } from "@shared/utils/bem";

import { ButtonInterface } from "./interfaces";

import "./styles.scss";

export const Button = (props: ButtonInterface) => {
  const {
    color,
    size,
    title,
    onClick
  } = props;

  const [block, element] = bem("button");

  return (
    <div
      onClick={onClick}
      className={block({
        color,
        size,
      })}
    >
      {title}
    </div>
  );
};
