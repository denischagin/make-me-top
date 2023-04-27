import { bem } from "@shared/utils/bem";
import { AvatarSmall } from "@shared/AvatarSmall";
import { Rating } from "@shared/Rating";

import { UserInterface, UserListInterface } from "@shared/types/common";

import "./styles.scss";

export const ExplorersList = (props: UserListInterface) => {
  const [block, element] = bem("explorers-list");
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
              <div className={element("rating")}>
                <Rating
                  starColor={"primary-500"}
                  size={"medium"}
                  scoreColor={"black"}
                  rating={user.rating}
                />
              </div>
            </div>
          </div>
        ))
      }
    </div>
  );
};
