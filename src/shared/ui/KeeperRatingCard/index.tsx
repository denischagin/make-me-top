import { Avatar } from "@shared/ui/Avatar";
import { avatarSize } from "@shared/ui/Avatar/interfaces";
import { Card } from "@shared/ui/Card";
import { cardSize } from "@shared/ui/Card/interfaces";
import { Rating } from "@shared/ui/Rating";
import {
	ratingScoreColor,
	ratingSize,
	ratingSystemColor,
} from "@shared/ui/Rating/interfaces";
import { Typography } from "@shared/ui/Typography";
import { typographyVariant } from "@shared/ui/Typography/interfaces";
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
