import { RatingCard } from "../../../widgets/cards/ratingCard/ratingCard";
import { CurrentStarCard } from "../../../widgets/cards/currentStarCard/currentStarCard";
import { Header } from "../../../widgets/header/header";
import { AvatarBig } from "../../../shared/avatars/avatarBig/avatarBig";
import { CardSmall } from "../../../shared/cards/cardSmall/cardSmall";
import { ReactComponent as StarIcon } from "../../../shared/images/star.svg";
import { CompletedStars } from "../../../widgets/completedStars/completedStars";

import "./styles.scss";

export const Explorer = () => {
  return (
    <div className="explorer">
      <Header />
      <div className="container">
        <div className="profile">
          <div className="profile-info">
            <AvatarBig image="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg" />
            <div className="info">
              <p className="info__name">Фамилия Имя Отчество </p>
              <div className="info-results">
                <CardSmall>
                  Рейтинг
                  <span className="info-results__rating">
                    <span className="info-results__rating-star">
                      <StarIcon/>
                    </span>
                    <p className="info-results__rating-text"><b>4.0</b></p>
                  </span>
                </CardSmall>
                <CardSmall>
                  Кол-во освоенных звезд
                  <p className="info-results__rating-finished"><b>11</b></p>
                </CardSmall>
              </div>
            </div>
          </div>
          <p className="container__profile-heading">Текущая звезда</p>
          <CurrentStarCard />
          <div className="complted-stars">
            <p className="complted-stars__heading">Освоенные звёзды</p>
            <CompletedStars />
          </div>
        </div>
        <div className="container__rating">
          <p className="container__rating-heading">Рейтинг</p>
          <RatingCard />
        </div>
      </div>
    </div>
  );
}
