import { Avatar } from "@shared/Avatar";
import { Card } from "@shared/Card";
import { Rating } from "@shared/Rating";
import { Typography } from "@shared/Typography";

import { bem } from "@shared/utils/bem";

import { UserDataInterface } from "./interfaces";
import { avatarSize } from "@shared/Avatar/interfaces";
import { cardSize } from "@shared/Card/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";
import {
  ratingScoreColor,
  ratingSize,
  ratingStarColor,
} from "@shared/Rating/interfaces";

import "./styles.scss";


export const UserInfo = (props: UserDataInterface) => {
  const {
    name,
    avatar,
    rating,
    children
  } = props;

  const [block, element] = bem("user-info");

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
        <div className={element("cards")}>
          <div className={element("rating")}>
            <Card size={cardSize.small}>
              <div className={element("rating-heading")}>
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
          </div>
          { children }
        </div>
      </div>
    </div>
  );
};
