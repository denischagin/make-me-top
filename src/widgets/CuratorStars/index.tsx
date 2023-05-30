import { Star } from "@shared/Star";
import { bem } from "@shared/utils/bem";
import { Rating } from "@shared/Rating";
import { starColor } from "@shared/Star/interfaces";
import { ratingScoreColor, ratingSize, ratingStarColor } from "@shared/Rating/interfaces";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";

import { arrayOfStars } from "./model";

import "./styles.scss";

export const CuratorStars = () => {
  const [block, element] = bem("curator-stars");

  return (
    <div className={block()}>
      <Typography
        variant={typographyVariant.h2}
        className={element("heading", "mb-4 mt-5")}
      >
        Звезды исследователя
      </Typography>
      <div className={element("stars", "mb-4")}>
        {arrayOfStars.map((item) => (
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
    </div>
  );
};
