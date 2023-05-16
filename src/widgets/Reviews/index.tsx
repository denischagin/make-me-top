import { bem } from "@shared/utils/bem";
import { ReviewCard } from "@shared/ReviewCard";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { Button } from "@shared/Button";
import { buttonSize } from "@shared/Button/interfaces";

import { ReviewsInterface } from "./interfaces";

import "./styles.scss";

export const Reviews = (props: ReviewsInterface) => {
  const {
    reviews
  } = props;

  const [block, element] = bem("reviews");

  return (
    <div className={block()}>
      <Typography variant={typographyVariant.h2}>
        <div className={element("planet-name", "mb-4")}>Отзывы</div>
      </Typography>
      <div className={element("cards")}>
        {
          reviews.map((item) => (
            <ReviewCard
              key={item.id}
              planet={item.planet}
              avatar={item.avatar}
              rating={item.rating}
              name={item.name}
              review={item.review}
            />
          ))
        }
      </div>
      <div className={element("button")}>
        <Button
          title="Показать ещё"
          size={buttonSize.large}
        />
      </div>
    </div>
  );
};
