import { bem } from "@shared/utils/bem";

import { AvatarInterface } from "@shared/types/common";

import "./styles.scss";

export const AvatarSmall = (props: AvatarInterface) => {
  const [block, element] = bem("avatar-icon");

  return (
    <img
      src={props.image}
      alt=""
      className={block()}
    />
  );
};
