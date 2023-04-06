import { AvatarBig } from "@shared/avatars/AvatarBig";
import { CardSmall } from "@shared/cards/CardSmall";
import { ReactComponent as StarIcon } from "@shared/images/star.svg";

import "./styles.scss";

export const ExplorerUserInfo = () => {
  return (
    <div className="profile-info">
      <AvatarBig image="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg" />
      <div className="profile-description">
        <p className="profile-description__name">Фамилия Имя Отчество</p>
        <div className="profile-rating">
          <CardSmall>
            <p className="profile-rating__text">Рейтинг</p>
            <span className="profile-rating profile-rating__current-rating">
              <StarIcon />
              <p className="profile-rating__current-rating-text">4.0</p>
            </span>
          </CardSmall>
          <CardSmall>
            <p className="profile-rating__text">Кол-во освоенных звезд</p>
            <p className="profile-rating__stars">11</p>
          </CardSmall>
        </div>
      </div>
    </div>
  );
};
