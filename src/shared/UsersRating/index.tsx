import { Typography } from "@shared/Typography";
import { AvatarSmall } from "@shared/AvatarSmall";
import { Rating } from "@shared/Rating";
import { bem } from "@shared/utils/bem";
import { UserInfoInterface } from "@shared/types/common";

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
        <Typography variant="regular14">{ name }</Typography>
      </div>
      <span className={element("user-score")}>
        <Rating
          rating={rating}
          size="medium"
          scoreColor="white"
          starColor="primary-500"
        />
      </span>
    </div>
  );
};
