import { Typography } from "@shared/Typography";
import { AvatarSmall } from "@shared/AvatarSmall";
import { Rating } from "@shared/Rating";
import { bem } from "@shared/utils/bem";
import { UserInfoInterface } from "@shared/types/common";
import { RatingScoreColor, RatingSize, RatingStarColor, TypographyVariant } from "@shared/types/enums";

import "./styles.scss";

export const UsersRating = (props: UserInfoInterface) => {
  const {
    user: {
      name,
      avatar,
      rating
    }
  } = props;

  const [block, element] = bem("rating-info");

  return (
    <div className={block()}>
      <AvatarSmall image={avatar} />
      <div className={element("user-name")}>
        <Typography variant={TypographyVariant.regular14}>{ name }</Typography>
      </div>
      <span className={element("user-score")}>
        <Rating
          rating={ rating }
          size={RatingSize.medium}
          scoreColor={RatingScoreColor.white}
          starColor={RatingStarColor.primary500}
        />
      </span>
    </div>
  );
};
