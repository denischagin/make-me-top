import { DividingLine } from "@shared/DividingLine";
import { Typography } from "@shared/Typography";
import { UsersRating } from "@shared/UsersRating";
import { CardBig } from "@shared/CardBig";
import { bem } from "@shared/utils/bem";
import { TypographyVariant } from "@shared/types/enums";

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
          <Typography variant={TypographyVariant.medium16}>Мой рейтинг</Typography>
        </div>
        <UsersRating
          user={user}
        />
        <DividingLine />
        <div className={element("heading")}>
          <Typography variant={TypographyVariant.medium16}>Общий рейтинг</Typography>
        </div>
        {list.map((user) => (
          <UsersRating
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </CardBig>
  );
};
