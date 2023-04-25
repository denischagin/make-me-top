import { ReactComponent as StarIcon } from "@shared/images/star.svg";
import { bem } from "@shared/utils/bem";

import { RatingInterface } from "./interfaces";

import "./styles.scss";

export const Rating = (props: RatingInterface) => {
  const {
    starColor,
    scoreColor,
    size
  } = props;

  const [block, element] = bem("rating");

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
      <p
        className={element("score", {
          size: size,
          color: scoreColor
        })}
      >
        { props.rating.toFixed(1) }
      </p>
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
