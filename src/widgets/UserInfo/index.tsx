import { Typography } from "@shared/Typography";
import { Rating } from "@shared/Rating";
import { Avatar } from "@shared/Avatar";
import { bem } from "@shared/utils/bem";
import { ratingScoreColor, ratingSize, ratingStarColor } from "@shared/Rating/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";
import { avatarSize } from "@shared/Avatar/interfaces";
import { Card } from "@shared/Card";
import { cardSize } from "@shared/Card/interfaces";
import { InfoCard } from "@shared/InfoCard";


import { UserInfoInterface } from "./interfaces";

import "./styles.scss";

export const UserInfo = (props: UserInfoInterface) => {
  const {
    name,
    avatar,
    rating,
    stars,
    reviews,
    planets,
    explorers
  } = props;

  const [block, element] = bem("user-info");

  return (
    <div className={block()}>
      <Avatar
        size={ avatarSize.large }
        image={ avatar }
        orbit
      />
      <div className={element("description")}>
        <div className={element("description-name", "mb-4")}>
          <Typography variant={typographyVariant.h1}>{ name }</Typography>
        </div>
        <div className={element("rating")}>
          <Card size={cardSize.small}>
            <div className={element("heading")}>
              <Typography variant={typographyVariant.regular16}>Рейтинг</Typography>
            </div>
            <span className={element("current-rating")}>
              <Rating
                scoreColor={ratingScoreColor.white}
                rating={ rating }
                size={ratingSize.large}
                starColor={ratingStarColor.primary500}
              />
            </span>
          </Card>
          {
            stars &&
            <InfoCard
              title="Кол-во звёзд"
              count={stars || 0}
            />
          }
          {
            reviews &&
            <InfoCard
              title="Отзывы"
              count={reviews || 0}
            />
          }
          {
            planets &&
            <InfoCard
              title="Кол-во планет"
              count={planets || 0}
            />
          }
          {
            explorers &&
            <InfoCard
              title="Кол-во исследователей"
              count={explorers || 0}
            />
          }
        </div>
      </div>
    </div>
  );
};
