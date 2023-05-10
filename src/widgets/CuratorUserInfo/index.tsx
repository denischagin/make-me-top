import { Typography } from "@shared/Typography";
import { AvatarBig } from "@shared/AvatarBig";
import { CardSmall } from "@shared/CardSmall";
import { Rating } from "@shared/Rating";
import { bem } from "@shared/utils/bem";
import { ratingScoreColor, ratingSize, ratingStarColor } from "@shared/Rating/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";

import { CuratorInterface } from "./interfaces";

import "./styles.scss";

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
      <AvatarBig image={ avatar } />
      <div className={element("description")}>
        <div className={element("description-name")}>
          <Typography variant={typographyVariant.h1}>{ name }</Typography>
        </div>
        <div className={element("rating")}>
          <CardSmall>
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
          </CardSmall>
          <CardSmall>
            <div className={element("heading")}>
              <Typography variant={typographyVariant.regular16}>
                Кол-во планет
              </Typography>
            </div>
            <span className={element("completed-stars")}>{ planets }</span>
          </CardSmall>
          <CardSmall>
            <div className={element("heading")}>
              <Typography variant={typographyVariant.regular16}>
                Кол-во исследователей
              </Typography>
            </div>
            <span className={element("explorers-count")}>{ explorers }</span>
          </CardSmall>
        </div>
      </div>
    </div>
  );
};
