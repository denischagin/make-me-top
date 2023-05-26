import { useState } from "react";

import { bem } from "@shared/utils/bem";
import { Typography } from "@shared/Typography";
import { typographyColor, typographyVariant } from "@shared/Typography/interfaces";
import { ReactComponent as CloseIcon } from "@shared/images/close.svg";
import { Rating } from "@shared/Rating";
import { Avatar } from "@shared/Avatar";
import { avatarSize } from "@shared/Avatar/interfaces";
import { ratingScoreColor, ratingSize, ratingStarColor } from "@shared/Rating/interfaces";
import { Portal } from "@shared/Portal";
import { ReviewModalInterface } from "@shared/types/common";

import "./styles.scss";

export const ReviewModal = (props: ReviewModalInterface) => {
  const {
    review: {
      planet,
      rating,
      name,
      avatar,
      comment,
    },
    setIsExpanded,
    isExpanded
  } = props;

  const [block, element] = bem("review-modal");

  return (
    <Portal target={document.body}>
      <div className={block({ closed: !isExpanded })}>
        <div className={element("content")}>
          <CloseIcon
            className={element("close-icon")}
            onClick={() => setIsExpanded!(!isExpanded)}
          />
          <div className={element("user")}>
            <Avatar
              size={avatarSize.large}
              image={avatar}
            />
            <div className={element("user-info")}>
              <Typography
                variant={typographyVariant.regular14}
                color={typographyColor.black}
              >
                <div className={element("planet-name")}>{planet}</div>
              </Typography>
              <Typography
                variant={typographyVariant.h1}
                color={typographyColor.black}
              >
                <p className={element("user-name")}>{name}</p>
              </Typography>
              <Rating
                scoreColor={ratingScoreColor.black}
                starColor={ratingStarColor.primary500}
                size={ratingSize.medium}
                rating={rating}
              />
            </div>
          </div>
          <Typography
            variant={typographyVariant.medium16}
            color={typographyColor.black}
          >
            <p className={element("review-text")}>{comment}</p>
          </Typography>
        </div>
      </div>
    </Portal>
  );
};
