import { DividingLine } from "@shared/DividingLine";
import { Typography } from "@shared/Typography";
import { UsersRating } from "@shared/UsersRating";
import { CardBig } from "@shared/CardBig";
import { bem } from "@shared/utils/bem";
import { RatingCardInterface } from "./interfaces";

import "./styles.scss";

export const RatingCard = (props: RatingCardInterface) => {
  const {
    list,
    user
  } = props;

  const [block, element] = bem("rating-card");

  return (
    <CardBig>
      <div className={block()}>
        <div className={element("heading")}>
          <Typography variant="medium16">Мой рейтинг</Typography>
        </div>
        <UsersRating
          name={user.name}
          avatar={user.avatar}
          rating={user.rating}
        />
        <DividingLine />
        <div className={element("heading")}>
          <Typography variant="medium16">Общий рейтинг</Typography>
        </div>
        {list.map((item) => (
          <UsersRating
            key={item.id}
            name={item.name}
            avatar={item.avatar}
            rating={item.rating}
          />
        ))}
      </div>
    </CardBig>
  );
};
