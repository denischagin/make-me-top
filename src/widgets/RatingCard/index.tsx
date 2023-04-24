import { DividingLine } from "@shared/DividingLine";
import { Typography } from "@shared/Typography";
import { UsersRating } from "@shared/UsersRating";
import { CardBig } from "@shared/CardBig";
import { bem } from "@shared/utils/bem";

import "./styles.scss";

export const RatingCard = () => {
  const [block, element] = bem("rating-card");

  const arrayOfUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <CardBig>
      <div className={block()}>
        <div className={element("heading")}>
          <Typography variant="medium16">Мой рейтинг</Typography>
        </div>
        {[1].map((item) => (
          <UsersRating key={item} />
        ))}
        <DividingLine />
        <div className={element("heading")}>
          <Typography variant="medium16">Общий рейтинг</Typography>
        </div>
        {arrayOfUsers.map((item) => (
          <UsersRating key={item} />
        ))}
      </div>
    </CardBig>
  );
};
