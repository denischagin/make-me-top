import { Link } from "react-router-dom";

import { LinkInterface } from "./interfaces";
import "./styles.scss";

export const RouterLink = (props: LinkInterface) => {
  return (
    <Link
      to={props.path}
      className="link"
    >
      {props.children}
    </Link>
  );
};
