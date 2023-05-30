import { useState } from "react";

import { Card } from "@shared/Card";
import { Typography } from "@shared/Typography";
import { Rating } from "@shared/Rating";
import { Avatar } from "@shared/Avatar";
import { ReviewModal } from "@shared/ReviewModal";

import { bem } from "@shared/utils/bem";
import { sliceString } from "@shared/utils/sliceString";

import { avatarSize } from "@shared/Avatar/interfaces";
import { cardSize } from "@shared/Card/interfaces";
import { typographyVariant } from "@shared/Typography/interfaces";
import { ratingScoreColor, ratingSize, ratingStarColor } from "@shared/Rating/interfaces";

import { ReviewCardInterface } from "@shared/types/common";

import "./styles.scss";

export const ReviewCard = (props: ReviewCardInterface) => {
  const {
    review,
    review: {
      planet,
      rating,
      name,
      avatar,
      comment,
    }
  } = props;

  const [block, element] = bem("review-card");
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <ReviewModal
        review={review}
        setIsExpanded={setIsExpanded}
        isExpanded={isExpanded}
      />
      <div className={block()}>
        <Card
          size={cardSize.medium}
          glow
        >
          <div className={element("heading")}>
            <Typography
              className={element("planet-name")}
              variant={typographyVariant.regular14}
            >
              {planet}
            </Typography>
            <Rating
              scoreColor={ratingScoreColor.white}
              starColor={ratingStarColor.primary500}
              size={ratingSize.medium}
              rating={rating}
            />
          </div>
          <div className={element("user")}>
            <Avatar
              size={avatarSize.small}
              image={avatar}
            />
            <Typography variant={typographyVariant.regular16}>
              {name}
            </Typography>
          </div>
          <div className={element("review")}>
            <Typography
              className={element("review-text")}
              variant={typographyVariant.regular14}
            >
              {sliceString(comment, 180)}
            </Typography>
            {
              comment.length > 180 &&
              <Typography
                className={element("expand")}
                onClick={() => setIsExpanded(!isExpanded)}
                variant={typographyVariant.regular14}
              >
                Прочитать полностью
              </Typography>
            }
          </div>
        </Card>
      </div>
    </>
  );
};
