import { bem } from "@shared/utils/bem";

import { ExplorerUserInfoInterface } from "./interfaces";
import { avatarSize } from "@shared/Avatar/interfaces";
import { cardSize } from "@shared/Card/interfaces";
import {
  ratingScoreColor,
  ratingSize,
  ratingStarColor,
} from "@shared/Rating/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";

import { Avatar } from "@shared/Avatar";
import { Card } from "@shared/Card";
import { Rating } from "@shared/Rating";
import { Typography } from "@shared/Typography";

import "./styles.scss";

export const ExplorerUserInfo = (props: ExplorerUserInfoInterface) => {
  const {
    user: {
      name,
      avatar,
      rating
    },
  } = props;

  const [block, element] = bem("profile-info");

  return (
    <div className={block()}>
      <Avatar
        size={avatarSize.large}
        image={avatar}
        orbit
      />
      <div className={element("description")}>
        <div className={element("description-name", "mb-4")}>
          <Typography variant={typographyVariant.h1}>{name}</Typography>
        </div>
        <div className={element("rating")}>
          <Card size={cardSize.small}>
            <div className={element("heading")}>
              <Typography variant={typographyVariant.regular16}>
                Рейтинг
              </Typography>
            </div>
            <span className={element("current-rating")}>
              <Rating
                scoreColor={ratingScoreColor.white}
                rating={rating}
                size={ratingSize.large}
                starColor={ratingStarColor.primary500}
              />
            </span>
          </Card>
          <Card size={cardSize.small}>
            <div className={element("heading")}>
              <Typography variant={typographyVariant.regular16}>
                Кол-во освоенных звезд
              </Typography>
            </div>
            <span className={element("completed-stars")}>11</span>
          </Card>
        </div>
      </div>
    </div>
  );
};
