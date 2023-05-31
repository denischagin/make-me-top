import { useAppSelector } from "@app/providers/store/hooks";

import { userInfoSelector } from "@entities/user/model/selectors";

import { Avatar } from "@shared/Avatar";
import { Rating } from "@shared/Rating";
import { Typography } from "@shared/Typography";
import { InfoCard } from "@shared/InfoCard";

import { bem } from "@shared/utils/bem";

import { avatarSize } from "@shared/Avatar/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";
import {
  ratingScoreColor,
  ratingSize,
  ratingStarColor,
} from "@shared/Rating/interfaces";

import "./styles.scss";

export const CuratorUserInfo = () => {
  const [block, element] = bem("curator-user-info");

  const userInfo = useAppSelector(userInfoSelector);

  const {
    name,
    avatar,
    rating,
    planets,
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
        <Typography
          className={element("description-name", "mb-4")}
          variant={typographyVariant.h1}
        >
          {name}
        </Typography>
        <div className={element("cards")}>
          <InfoCard
            title="Рейтинг"
            value={
              <Rating
                scoreColor={ratingScoreColor.white}
                rating={rating}
                size={ratingSize.large}
                starColor={ratingStarColor.primary500}
              />
            }
          />
          <InfoCard
            title="Кол-во планет"
            value={planets || 0}
          />
          <InfoCard
            title="Кол-во исследователей"
            value={explorers || 0}
          />
        </div>
      </div>
    </div>
  );
};
