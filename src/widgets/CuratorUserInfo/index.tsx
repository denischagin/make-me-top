import { Typography } from "@shared/Typography";
import { Rating } from "@shared/Rating";
import { Avatar } from "@shared/Avatar";
import { bem } from "@shared/utils/bem";
import { ratingScoreColor, ratingSize, ratingStarColor } from "@shared/Rating/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";
import { avatarSize } from "@shared/Avatar/interfaces";
import { Card } from "@shared/Card";

import { CuratorInterface } from "./interfaces";

import "./styles.scss";
import { cardSize } from "@shared/Card/interfaces";

export const CuratorUserInfo = (props: CuratorInterface) => {
  const {
    curator: {
      name,
      avatar,
      rating,
      explorers,
      planets
    }
  } = props;

  const [block, element] = bem("curator-info");

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
          <Card size={cardSize.small}>
            <div className={element("heading")}>
              <Typography variant={typographyVariant.regular16}>
                Кол-во планет
              </Typography>
            </div>
            <span className={element("completed-stars")}>{ planets }</span>
          </Card>
          <Card size={cardSize.small}>
            <div className={element("heading")}>
              <Typography variant={typographyVariant.regular16}>
                Кол-во исследователей
              </Typography>
            </div>
            <span className={element("explorers-count")}>{ explorers }</span>
          </Card>
        </div>
      </div>
    </div>
  );
};
