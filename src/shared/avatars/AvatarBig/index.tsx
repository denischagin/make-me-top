import { bem } from "@shared/utils/bem";

import { AvatarInterface } from "./interfaces";
import "./styles.scss";

export const AvatarBig = (props: AvatarInterface) => {
  const [block, element] = bem("avatar");

  return (
    <div className={block()}>
      <div className={element("border")}>
        <div className={element("orbit")} />
      </div>
      <img
        src={props.image}
        alt=""
        className={element("image")}
      />
    </div>
  );
};
