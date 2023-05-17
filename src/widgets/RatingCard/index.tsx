import { DividingLine } from "@shared/DividingLine";
import { Typography } from "@shared/Typography";
import { UsersRating } from "@shared/UsersRating";
import { Card } from "@shared/Card";
import { bem } from "@shared/utils/bem";
import { typographyVariant } from "@shared/Typography/interfaces";
import { RatingCardInterface } from "./interfaces";
import { cardSize } from "@shared/Card/interfaces";

import "./styles.scss";

export const RatingCard = (props: RatingCardInterface) => {
  const {
    list,
    user
  } = props;

  const [block, element] = bem("rating-card");

  return (
    <Card size={cardSize.large}>
      <div className={block()}>
        <div className={element("heading", "mb-4")}>
          <Typography variant={typographyVariant.medium16}>Мой рейтинг</Typography>
        </div>
        <UsersRating
          user={user}
        />
        <DividingLine />
        <div className={element("heading", "mb-4")}>
          <Typography variant={typographyVariant.medium16}>Общий рейтинг</Typography>
        </div>
        {list.map((user) => (
          <UsersRating
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </Card>
  );
};
