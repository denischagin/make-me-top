import { DividingLine } from "@shared/DividingLine";
import { Typography } from "@shared/Typography";
import { UsersRating } from "@shared/UsersRating";
import { AvatarSmall } from "@shared/avatars/AvatarSmall";
import { CardBig } from "@shared/cards/CardBig";
import { ReactComponent as StarIcon } from "@shared/images/star.svg";

import "./styles.scss";

export const RatingCard = () => {
  const arrayOfUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="rating-card">
      <CardBig>
        <div className="my-rating">
          <div className="my-rating__heading">
            <Typography variant="medium16">Мой рейтинг</Typography>
          </div>
          <div className="my-rating-info">
            <AvatarSmall image="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg" />
            <div className="my-rating-info__user-name">
              <Typography variant="regular14">Фамилия Имя Отчество</Typography>
            </div>
            <span className="my-rating-info__user-score">
              <StarIcon />
              <p className="my-rating-info__user-score-num">4.8</p>
            </span>
          </div>
        </div>
        <DividingLine />
        <div className="general-rating">
          <div className="general-rating__heading">
            <Typography variant="medium16">Общий рейтинг</Typography>
          </div>
          {arrayOfUsers.map((item) => (
            <UsersRating key={item} />
          ))}
        </div>
      </CardBig>
    </div>
  );
};
