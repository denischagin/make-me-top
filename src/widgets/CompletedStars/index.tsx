import { Star } from "@shared/Star";
import { ReactComponent as StarIcon } from "@shared/images/star.svg";

import { arrayOfStars } from "./model";
import "./styles.scss";

export const CompletedStars = () => {
  return (
    <div className="completed-stars">
      {arrayOfStars.map((item) => (
        <Star
          color="primary-500"
          key={item.name}
        >
          <p className="completed-stars__label">{item.name}</p>
          <div className="stars-rating">
            <StarIcon />
            <p className="stars-rating__rating-num">{item.rate}</p>
          </div>
        </Star>
      ))}
    </div>
  );
};
