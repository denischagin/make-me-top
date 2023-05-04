import { bem } from "@shared/utils/bem";

import { TypographyInterface } from "./interfaces";

import "./styles.scss";

export const Typography = (props: TypographyInterface) => {
  const [block, element] = bem("typography");

  return (
    <div
      className={block({
        color: props.color,
        variant: props.variant,
      })}
    >
      {props.children}
    </div>
  );
};
