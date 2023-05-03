import { AvatarSmall } from "@shared/AvatarSmall";
import { Rating } from "@shared/Rating";
import { bem } from "@shared/utils/bem";
import { ratingScoreColor, ratingSize, ratingStarColor } from "@shared/Rating/interfaces";
import { badgeColor } from "@shared/Badge/interfaces";
import { Badge } from "@shared/Badge";

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
            <Badge color={badgeColor.primary500}>{badgeTitle}</Badge>
          </span>
          <Rating
            starColor={ratingStarColor.primary500}
            size={ratingSize.medium}
            scoreColor={ratingScoreColor.black}
            rating={ rating }
          />
        </div>
      </div>
    </div>
  );
};
