import { ReactComponent as StarIcon } from "@shared/images/star.svg";
import { ReactComponent as StarBigIcon } from "@shared/images/star-big.svg";
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
        (
          props.size === "small" || props.size === "medium"
            ? <StarIcon className={element("star", { color: starColor })} />
            : <StarBigIcon className={element("star", { color: starColor })} />
        )
      }
      <p className={element("score", {
        size: size,
        color: scoreColor
      })}>
        { props.rating.toFixed(1) }
      </p>
      {
        props.reflect &&
        (
          props.size === "large"
            ? <StarBigIcon className={element("star", { color: starColor })} />
            : <StarIcon className={element("star", { color: starColor })} />
        )
      }
    </div>
  );
};
