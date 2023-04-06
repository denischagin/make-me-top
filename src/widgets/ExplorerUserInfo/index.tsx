import { Typography } from "@shared/Typography";
import { AvatarBig } from "@shared/avatars/AvatarBig";
import { CardSmall } from "@shared/cards/CardSmall";
import { ReactComponent as StarIcon } from "@shared/images/star.svg";

import "./styles.scss";

export const ExplorerUserInfo = () => {
  return (
    <div className="profile-info">
      <AvatarBig image="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg" />
      <div className="profile-description">
        <div className="profile-description__name">
          <Typography variant="h1">Фамилия Имя Отчество</Typography>
        </div>
        <div className="profile-rating">
          <CardSmall>
            <div className="profile-rating__text">
              <Typography variant="regular16">Рейтинг</Typography>
            </div>
            <span className="profile-rating profile-rating__current-rating">
              <StarIcon />
              <p className="profile-rating__current-rating-text">4.0</p>
            </span>
          </CardSmall>
          <CardSmall>
            <div className="profile-rating__text">
              <Typography variant="regular16">
                Кол-во освоенных звезд
              </Typography>
            </div>
            <p className="profile-rating__stars">11</p>
          </CardSmall>
        </div>
      </div>
    </div>
  );
};
