import { bem } from "@shared/utils/bem";
import { AvatarSmall } from "@shared/AvatarSmall";
import { Rating } from "@shared/Rating";

import { UserInterface, UserListInterface } from "@shared/types/common";
import { ratingStarColor, ratingSize, ratingScoreColor } from "@shared/Rating/interfaces";

import "./styles.scss";

export const UsersList = (props: UserListInterface) => {
  const [block, element] = bem("users-list");
  const {
    list,
  } = props;

  return (
    <div className={block()}>
      {
        list.map((user: UserInterface) => (
          <div
            key={user.id}
            className={element("item")}
          >
            <div className={element("user")}>
              <AvatarSmall image={user.avatar} />
              <span className={element("name")}>{ user.name }</span>
            </div>
            <div className={element("info")}>
              <Rating
                starColor={ratingStarColor.primary500}
                size={ratingSize.medium}
                scoreColor={ratingScoreColor.black}
                rating={ user.rating }
              />
            </div>
          </div>
        ))
      }
    </div>
  );
};
