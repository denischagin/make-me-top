import { Star } from "@shared/Star";
import { ReactComponent as StarIcon } from "@shared/images/star.svg";
import { bem } from "@shared/utils/bem";

import { arrayOfStars } from "./model";
import "./styles.scss";

export const CompletedStars = () => {
  const [block, element] = bem("completed-stars");

  return (
    <div className={block()}>
      {arrayOfStars.map((item) => (
        <Star
          color="primary-500"
          key={item.name}
        >
          <p className={element("label")}>{item.name}</p>
          <div className={element("star-rating")}>
            <StarIcon />
            <p className={element("star-rating-score")}>{item.rate}</p>
          </div>
        </Star>
      ))}
    </div>
  );
};
