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
                4.0
              </p>
            </span>
          </CardSmall>
          <CardSmall>
            Кол-во освоенных звезд
            <p className="info-results__rating-finished">
              11
            </p>
          </CardSmall>
        </div>
      </div>
    </div>
  );
};
