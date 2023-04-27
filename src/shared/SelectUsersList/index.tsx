import { useState } from "react";

import { bem } from "@shared/utils/bem";
import { Button } from "@shared/Button";
import { AvatarSmall } from "@shared/AvatarSmall";
import { Rating } from "@shared/Rating";

import { UserInterface, UserListInterface } from "@shared/types/common";

import "./styles.scss";

export const SelectUsersList = (props: UserListInterface) => {
  const {
    list
  } = props;

  const [block, element] = bem("select-list");
  const [selectedUserIds, setSelectedUserIds] = useState<Array<number>>([]);

  function handleUserSelect(userId: number) {
    setSelectedUserIds([...selectedUserIds, userId]);
  }

  function handleCancelSelect(userId: number) {
    setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
  }

  return (
    <div className={block()}>
      {
        list.map((user: UserInterface) => (
          <div
            key={user.id}
            className={element("item", { selected: selectedUserIds.includes(user.id) })}
          >
            <div className={element("user")}>
              <AvatarSmall image={user.avatar} />
              <span className={element("name")}>{ user.name }</span>
            </div>
            <div className={element("info")}>
              <div className={element("button", { visible: selectedUserIds.includes(user.id) })}>
                {
                  !selectedUserIds.includes(user.id)
                    ? <Button
                      size="small"
                      color={ "filled" }
                      action={() => handleUserSelect(user.id)}
                      title={ "Выбрать хранителя" }
                    />
                    : <Button
                      size="small"
                      color={ "primary-500" }
                      action={() => handleCancelSelect(user.id)}
                      title={ "Отменить выбор" }
                    />
                }
              </div>
              <div className={element("rating", { hide: selectedUserIds.includes(user.id) } )}>
                <Rating
                  starColor="primary-500"
                  size="medium"
                  scoreColor="black"
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
