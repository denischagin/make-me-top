import { Typography } from "@shared/Typography";
import { AvatarSmall } from "@shared/AvatarSmall";
import { Rating } from "@shared/Rating";
import { bem } from "@shared/utils/bem";
import { UserInfoInterface } from "@shared/types/common";
import { ratingSize, ratingScoreColor, ratingStarColor } from "@shared/Rating/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";

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
        <Typography variant={typographyVariant.regular14}>{ name }</Typography>
      </div>
      <span className={element("user-score")}>
        <Rating
          rating={ rating }
          size={ratingSize.medium}
          scoreColor={ratingScoreColor.white}
          starColor={ratingStarColor.primary500}
        />
      </span>
    </div>
  );
};
