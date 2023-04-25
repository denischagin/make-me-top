import { Star } from "@shared/Star";
import { bem } from "@shared/utils/bem";
import { Rating } from "@shared/Rating";

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
            <Rating
              scoreColor="white"
              rating={item.rate}
              size="small"
              starColor="white"
            />
          </div>
        </Star>
      ))}
    </div>
  );
};
