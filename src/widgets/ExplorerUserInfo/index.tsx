import { Typography } from "@shared/Typography";
import { AvatarBig } from "@shared/AvatarBig";
import { CardSmall } from "@shared/CardSmall";
import { Rating } from "@shared/Rating";
import { bem } from "@shared/utils/bem";
import { UserInfoInterface } from "@shared/types/common";
import { RatingScoreColor, RatingSize, RatingStarColor, TypographyVariant } from "@shared/types/enums";

import "./styles.scss";

export const ExplorerUserInfo = (props: UserInfoInterface) => {
  const {
    user: {
      name,
      avatar,
      rating
    }
  } = props;

  const [block, element] = bem("profile-info");

  return (
    <div className={block()}>
      <AvatarBig image={ avatar } />
      <div className={element("description")}>
        <div className={element("description-name")}>
          <Typography variant={TypographyVariant.h1}>{ name }</Typography>
        </div>
        <div className={element("rating")}>
          <CardSmall>
            <div className={element("heading")}>
              <Typography variant={TypographyVariant.regular16}>Рейтинг</Typography>
            </div>
            <span className={element("current-rating")}>
              <Rating
                scoreColor={RatingScoreColor.white}
                rating={ rating }
                size={RatingSize.large}
                starColor={RatingStarColor.primary500}
              />
            </span>
          </CardSmall>
          <CardSmall>
            <div className={element("heading")}>
              <Typography variant={TypographyVariant.regular16}>
                Кол-во освоенных звезд
              </Typography>
            </div>
            <p className={element("completed-stars")}>11</p>
          </CardSmall>
        </div>
      </div>
    </div>
  );
};
