import { ReactComponent as StarIcon } from "@shared/images/star.svg";
import { bem } from "@shared/utils/bem";

import { RatingInterface } from "./interfaces";

import "./styles.scss";

export const Rating = (props: RatingInterface) => {
  const {
    starColor,
    scoreColor,
    size,
    rating
  } = props;

  const [block, element] = bem("rating");

  const score = rating ? rating.toFixed(1) : "—";

  return (
    <div className={block()}>
      {
        !props.reflect &&
        <StarIcon
          className={element("star", {
            color: starColor,
            size: size
          })}
        />
      }
      <span
        className={element("score", {
          size: size,
          color: scoreColor
        })}
      >
        { score }
      </span>
      {
        props.reflect &&
        <StarIcon className={element("star", {
          color: starColor,
          size: size
        })} />
      }
    </div>
  );
};
