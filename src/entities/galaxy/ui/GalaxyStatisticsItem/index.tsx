import { Typography } from "@shared/Typography";
import { typographyVariant } from "@shared/Typography/interfaces";
import { bem } from "@shared/utils/bem";
import React from "react";
import { GalaxyStatisticsItemProps } from "./interface";
import './style.scss'

export const GalaxyStatisticsItem = ({ stat, title }: GalaxyStatisticsItemProps) => {
    const [block] = bem('statistics-item')

	return (
		<div className={block()}>
			<Typography variant={typographyVariant.medium14}>
				{title}
			</Typography>
			<Typography variant={typographyVariant.h2}>
				{stat}
			</Typography>
		</div>
	);
};
