import { Rating } from "@shared/Rating";
import { Star } from "@shared/Star";

import { bem } from "@shared/utils/bem";

import { COMPLETED_STARS_LIST } from "./model";

import {
  ratingScoreColor,
  ratingSize,
  ratingStarColor,
} from "@shared/Rating/interfaces";
import { starColor } from "@shared/Star/interfaces";

import "./styles.scss";

export const CompletedStars = () => {
  const [block, element] = bem("completed-stars");

  return (
    <div className={block()}>
      {COMPLETED_STARS_LIST.map((item) => (
        <Star
          color={starColor.primary500}
          key={item.name}
        >
          <p className={element("label")}>{item.name}</p>
          <div className={element("star-rating")}>
            <Rating
              scoreColor={ratingScoreColor.white}
              rating={item.rate}
              size={ratingSize.small}
              starColor={ratingStarColor.white}
            />
          </div>
        </Star>
      ))}
    </div>
  );
};
