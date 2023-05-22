import { useState } from "react";

import { bem } from "@shared/utils/bem";

import { avatarSize } from "@shared/Avatar/interfaces";
import { buttonColor, buttonSize } from "@shared/Button/interfaces";
import {
  ratingScoreColor,
  ratingSize,
  ratingStarColor,
} from "@shared/Rating/interfaces";

import { UserInterface, UserListInterface } from "@shared/types/common";

import { Avatar } from "@shared/Avatar";
import { Button } from "@shared/Button";
import { Rating } from "@shared/Rating";

import "./styles.scss";

export const SelectUsersList = (props: UserListInterface) => {
  const {
    list
  } = props;

  const [block, element] = bem("select-list");
  const [selectedUserIds, setSelectedUserIds] = useState<Array<number>>([]);

  function getSelectedUser(userId: number) {
    setSelectedUserIds([...selectedUserIds, userId]);
  }

  function removeSelectedUser(userId: number) {
    setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
  }

  return (
    <div className={block()}>
      {list.map((user: UserInterface) => (
        <div
          key={user.id}
          className={element("item", {
            selected: selectedUserIds.includes(user.id),
          })}
        >
          <div className={element("user")}>
            <Avatar
              size={avatarSize.small}
              image={user.avatar}
            />
            <span className={element("name")}>{user.name}</span>
          </div>
          <div className={element("info")}>
            <div
              className={element("button", {
                visible: selectedUserIds.includes(user.id),
              })}
            >
              {!selectedUserIds.includes(user.id) ? (
                <Button
                  size={buttonSize.small}
                  color={buttonColor.filled}
                  action={() => getSelectedUser(user.id)}
                  title="Выбрать хранителя"
                />
              ) : (
                <Button
                  size={buttonSize.small}
                  color={buttonColor.primary500}
                  action={() => removeSelectedUser(user.id)}
                  title="Отменить выбор"
                />
              )}
            </div>
            <div
              className={element("rating", {
                hide: selectedUserIds.includes(user.id),
              })}
            >
              <Rating
                starColor={ratingStarColor.primary500}
                size={ratingSize.medium}
                scoreColor={ratingScoreColor.black}
                rating={user.rating}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
