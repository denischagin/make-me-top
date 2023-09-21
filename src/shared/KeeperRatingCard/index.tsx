import { Avatar } from "@shared/Avatar";
import { avatarSize } from "@shared/Avatar/interfaces";
import { Card } from "@shared/Card";
import { cardSize } from "@shared/Card/interfaces";
import { Rating } from "@shared/Rating";
import {
	ratingScoreColor,
	ratingSize,
	ratingSystemColor,
} from "@shared/Rating/interfaces";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { bem } from "@shared/utils/bem";
import "./style.scss";
import React from "react";
import { KeeperRatingCardProps } from "./interface";

export const KeeperRatingCard = ({ fullname, rating }: KeeperRatingCardProps) => {
	const [block, element] = bem("keeper-rating-card");
	return (
		<div className={block()}>
			<Card size={cardSize.medium}>
				<Avatar size={avatarSize.large} />
				<Typography variant={typographyVariant.medium14}>
					{fullname}
				</Typography>
				<Rating
					scoreColor={ratingScoreColor.white}
					systemColor={ratingSystemColor.primary500}
					size={ratingSize.medium}
                    rating={rating}
				/>
			</Card>
		</div>
	);
};
