import { Card } from "@shared/Card";
import { cardSize } from "@shared/Card/interfaces";
import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import React from "react";
import { SortCardProps } from "./interface";
import { bem } from "@shared/utils/bem";
import "./style.scss";

export const SortCard = ({ title, value }: SortCardProps) => {
	const [block] = bem("sort-card");

	return (
		<div className={block()}>
			<Card size={cardSize.medium}>
				<Typography variant={typographyVariant.regular16}>{title}</Typography>

				<Typography variant={typographyVariant.medium16}>{value}</Typography>
			</Card>
		</div>
	);
};
