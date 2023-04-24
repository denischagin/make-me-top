import { Typography } from "@shared/Typography";
import { AvatarBig } from "@shared/AvatarBig";
import { CardSmall } from "@shared/CardSmall";
import { ReactComponent as StarIcon } from "@shared/images/star.svg";
import { bem } from "@shared/utils/bem";

import "./styles.scss";

export const ExplorerUserInfo = () => {
  const [block, element] = bem("profile-info");

  return (
    <div className={block()}>
      <AvatarBig image="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg" />
      <div className={element("description")}>
        <div className={element("description-name")}>
          <Typography variant="h1">Фамилия Имя Отчество</Typography>
        </div>
        <div className={element("rating")}>
          <CardSmall>
            <div className={element("heading")}>
              <Typography variant="regular16">Рейтинг</Typography>
            </div>
            <span className={element("current-rating")}>
              <StarIcon />
              <p className={element("current-score")}>4.0</p>
            </span>
          </CardSmall>
          <CardSmall>
            <div className={element("heading")}>
              <Typography variant="regular16">
                Кол-во освоенных звезд
              </Typography>
            </div>
            <p className={element("completed-stars")}>11</p>
          </CardSmall>
        </div>
      </div>
    </div>
  );
};
