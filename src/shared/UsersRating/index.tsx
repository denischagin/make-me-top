import { ReactComponent as StarIcon } from "@/shared/images/star.svg";

import { AvatarSmall } from "../avatars/AvatarSmall";
import "./styles.scss";

export const UsersRating = () => {
  return (
    <div className="rating-info">
      <AvatarSmall image="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg" />
      <p className="rating-info__user-name">Фамилия Имя Отчество</p>
      <span className="rating-info__user-score">
        <StarIcon className="rating-info__user-score-star" />
        <p className="rating-info__user-score-num">4.8</p>
      </span>
    </div>
  );
};
