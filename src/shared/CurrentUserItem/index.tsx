import { AvatarSmall } from "@shared/AvatarSmall";
import { Rating } from "@shared/Rating";
import { bem } from "@shared/utils/bem";

import { CurrentUserItemInterface } from "./interfaces";

import "./styles.scss";

export const CurrentUserItem = (props: CurrentUserItemInterface) => {
  const {
    badgeTitle,
    user: {
      name,
      avatar,
      rating
    }
  } = props;

  const [block, element] = bem("current-user");

  return (
    <div className={block()}>
      <div className={element("item")}>
        <div className={element("user")}>
          <AvatarSmall image={ avatar } />
          <span className={element("my-name")}>{ name }</span>
        </div>
        <div className={element("info")}>
          <span className={element("badge")}>
            { badgeTitle }
          </span>
          <span className={element("rating")}>
            <Rating
              starColor={"primary-500"}
              size={"medium"}
              scoreColor={"black"}
              rating={ rating }
            />
          </span>
        </div>
      </div>
    </div>
  );
};
