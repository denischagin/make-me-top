import { Typography } from "@shared/Typography";
import { AvatarSmall } from "@shared/avatars/AvatarSmall";
import { ReactComponent as StarIcon } from "@shared/images/star.svg";
import { bem } from "@shared/utils/bem";

import "./styles.scss";

export const UsersRating = () => {
  const [block, element] = bem("rating-info");

  return (
    <div className={block()}>
      <AvatarSmall image="https://incrussia.ru/wp-content/uploads/2019/03/iStock-918704584-1.jpg" />
      <div className={element("user-name")}>
        <Typography variant="regular14">Фамилия Имя Отчество</Typography>
      </div>
      <span className={element("user-score")}>
        <StarIcon className={element("user-score-star")} />
        <p className={element("user-score-num")}>4.8</p>
      </span>
    </div>
  );
};
