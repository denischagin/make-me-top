import { AvatarSmall } from "@/shared/avatars/AvatarSmall";
import { CardBig } from "@/shared/cards/CardBig";
import { ReactComponent as StarIcon } from "@/shared/images/star.svg";
import { UsersRating } from "@/shared/UsersRating";

import "./styles.scss";

export const RatingCard = () => {
  const arrayOfUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="rating-card">
      <CardBig>
        <div className="my-rating">
          <p className="my-rating__heading">Мой рейтинг</p>
          <div className="my-rating-info">
            <AvatarSmall image="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg" />
            <p className="my-rating-info__user-name">Фамилия Имя Отчество</p>
            <span className="my-rating-info__user-score">
              <StarIcon />
              <p className="my-rating-info__user-score-num">4.8</p>
            </span>
          </div>
        </div>
        <hr
          style={{
            border: "1px solid #292929",
            borderBottom: "0px",
          }}
        />
        <div className="general-rating">
          <p className="general-rating__heading">Общий рейтинг</p>
          {arrayOfUsers.map((item) => (
            <UsersRating key={item} />
          ))}
        </div>
      </CardBig>
    </div>
  );
};
