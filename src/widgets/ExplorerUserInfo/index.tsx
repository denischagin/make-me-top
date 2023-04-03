import { AvatarBig } from "@/shared/avatars/AvatarBig";
import { CardSmall } from "@/shared/cards/CardSmall";
import { ReactComponent as StarIcon } from "@/shared/images/star.svg";

import "./styles.scss";

export const ExplorerUserInfo = () => {
  return (
    <div className="profile-info">
      <AvatarBig image="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg" />
      <div className="info">
        <p className="info__name">Фамилия Имя Отчество</p>
        <div className="info-results">
          <CardSmall>
            Рейтинг
            <span className="info-results__rating">
              <span className="info-results__rating-star">
                <StarIcon />
              </span>
              <p className="info-results__rating-text">
                <b>4.0</b>
              </p>
            </span>
          </CardSmall>
          <CardSmall>
            Кол-во освоенных звезд
            <p className="info-results__rating-finished">
              <b>11</b>
            </p>
          </CardSmall>
        </div>
      </div>
    </div>
  );
};
