import { Avatar } from "@shared/ui/Avatar";
import { Button } from "@shared/ui/Button";
import { Rating } from "@shared/ui/Rating";
import { bem } from "@shared/utils/bem";
import { getUserFullName } from "@shared/utils/getUserFullName";
import { avatarSize } from "@shared/ui/Avatar/interfaces";
import { buttonColor, buttonSize } from "@shared/ui/Button/interfaces";
import { ratingScoreColor, ratingSize, ratingSystemColor } from "@shared/ui/Rating/interfaces";
import { SelectUsersKeepersItemProps } from "./interface";

export const SelectUsersKeepersItem = (props: SelectUsersKeepersItemProps) => {
  const { user, selected, onRemoveUser, onSelectUser } = props;

  const [block, element] = bem("select-list");

  return (
    <div
      key={user.personId}
      className={element("item", { selected })}
    >
      <div className={element("user")}>
        <Avatar size={avatarSize.small} />
        <span className={element("name")}>{getUserFullName(user)}</span>
      </div>
      <div className={element("info")}>
        <div
          className={element("button", { visible: selected })}
        >
          {!selected ? (
            <Button
              size={buttonSize.small}
              color={buttonColor.filled}
              onClick={() => onSelectUser(user)}
              title="Выбрать хранителя"
            />
          ) : (
            <Button
              size={buttonSize.small}
              color={buttonColor.primary500}
              onClick={() => onRemoveUser(user.personId)}
              title="Отменить выбор"
            />
          )}
        </div>
        <div
          className={element("rating", { hide: selected })}
        >
          <Rating
            systemColor={ratingSystemColor.primary500}
            size={ratingSize.medium}
            scoreColor={ratingScoreColor.black}
            rating={user.rating}
          />
        </div>
      </div>
    </div>
  );
};
