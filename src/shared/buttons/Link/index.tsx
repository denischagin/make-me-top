import { Link } from "react-router-dom";

import { bem } from "@shared/utils/bem";

import { LinkInterface } from "./interfaces";
import "./styles.scss";

export const RouterLink = (props: LinkInterface) => {
  const [block, element] = bem("link");

  return (
    <Link
      to={props.path}
      className={block()}
    >
      {props.children}
    </Link>
  );
};
