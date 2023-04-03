import { Star } from "@/shared/Star";
import { ReactComponent as StarIcon } from "@/shared/images/star.svg";

import { arrayOfStars } from "./model";
import "./styles.scss";

export const CompletedStars = () => {
  return (
    <div className="completed-stars">
      {arrayOfStars.map((item) => (
        <Star
          color="orange"
          key={item.name}
        >
          <p className="completed-stars__label">{item.name}</p>
          <span className="completed-stars__rating">
            <StarIcon />
            <p className="completed-stars__rating-num">{item.rate}</p>
          </span>
        </Star>
      ))}
    </div>
  );
};
