import { PropsWithChildren } from "react";

import "./styles.scss";

export const CardBig = (props: PropsWithChildren) => {
  return (
    <div className="card-big">
      <div className="card-big-container">{props.children}</div>
    </div>
  );
};
