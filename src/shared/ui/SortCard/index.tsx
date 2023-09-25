import { Card } from "@shared/ui/Card";
import { cardSize } from "@shared/ui/Card/interfaces";
import { Typography } from "@shared/ui/Typography";
import { typographyVariant } from "@shared/ui/Typography/interfaces";
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
