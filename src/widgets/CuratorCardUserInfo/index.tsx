import { useAppSelector } from "@app/providers/store/hooks";

import { Avatar } from "@shared/Avatar";
import { Card } from "@shared/Card";
import { Rating } from "@shared/Rating";
import { Typography } from "@shared/Typography";
import { InfoCard } from "@shared/InfoCard";

import { bem } from "@shared/utils/bem";

import { avatarSize } from "@shared/Avatar/interfaces";
import { cardSize } from "@shared/Card/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";
import {
  ratingScoreColor,
  ratingSize,
  ratingStarColor,
} from "@shared/Rating/interfaces";

import "./styles.scss";

export const CuratorCardUserInfo = () => {
  const [block, element] = bem("curator-card-user-info");

  const userInfo = useAppSelector((state) => state.user.userInfo);

  const {
    name,
    avatar,
    rating,
    stars,
    explorers,
  } = userInfo;

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
          <InfoCard
            title="Кол-во звёзд"
            count={stars || 0}
          />
          <InfoCard
            title="Кол-во исследователей"
            count={explorers || 0}
          />
        </div>
      </div>
    </div>
  );
};
