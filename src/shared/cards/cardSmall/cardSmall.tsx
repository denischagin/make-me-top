import { PropsWithChildren } from "react";
import "./styles.scss";

export const CardSmall = (props: PropsWithChildren) => {
  return (
    <div className="card-small">
      <div className="card-small-container">
        {props.children}
      </div>
    </div>
  );
}
