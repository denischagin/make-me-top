import { useAppSelector } from "@app/providers/store/hooks";

import { curatorReviewsSelector } from "@entities/curator/model/selectors";

import { ReviewCard } from "@shared/ReviewCard";
import { Typography } from "@shared/Typography";
import { Button } from "@shared/Button";

import { bem } from "@shared/utils/bem";

import { typographyVariant } from "@shared/Typography/interfaces";
import { buttonSize } from "@shared/Button/interfaces";

import "./styles.scss";

export const Reviews = () => {
  const [block, element] = bem("reviews");

  const reviews = useAppSelector(curatorReviewsSelector);

  return (
    <div className={block()}>
      <Typography
        className={element("heading", "mb-4 mt-5")}
        variant={typographyVariant.h2}
      >
        Отзывы
      </Typography>
      <div className={element("cards")}>
        {
          reviews.map((item) => (
            <ReviewCard
              key={item.id}
              review={item}
            />
          ))
        }
      </div>
      <div className={element("button", "mt-5")}>
        <Button
          title="Показать ещё"
          size={buttonSize.large}
        />
      </div>
    </div>
  );
};
