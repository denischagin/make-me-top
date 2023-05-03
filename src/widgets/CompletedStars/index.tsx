import { Star } from "@shared/Star";
import { bem } from "@shared/utils/bem";
import { Rating } from "@shared/Rating";
import { RatingScoreColor, RatingSize, RatingStarColor, StarColor } from "@shared/types/enums";

import { arrayOfStars } from "./model";

import "./styles.scss";

export const CompletedStars = () => {
  const [block, element] = bem("completed-stars");

  return (
    <div className={block()}>
      {arrayOfStars.map((item) => (
        <Star
          color={StarColor.primary500}
          key={item.name}
        >
          <p className={element("label")}>{item.name}</p>
          <div className={element("star-rating")}>
            <Rating
              scoreColor={RatingScoreColor.white}
              rating={item.rate}
              size={RatingSize.small}
              starColor={RatingStarColor.white}
            />
          </div>
        </Star>
      ))}
    </div>
  );
};
