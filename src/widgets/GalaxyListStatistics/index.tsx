import React from "react";
import { GalaxyListStatisticsProps } from "./interface";
import { bem } from "@shared/utils/bem";
import { GalaxyStatisticsItem } from "@entities/galaxy/ui/GalaxyStatisticsItem";
import './style.scss'

export const GalaxyListStatistics = ({
	explorerCount = 0,
	keeperCount = 0,
	systemCount = 0,
}: GalaxyListStatisticsProps) => {
	const [block] = bem("statistics");
    
	return (
		<div className={block()}>
			<GalaxyStatisticsItem
				title="Количество систем:"
				stat={systemCount}
			/>
			<GalaxyStatisticsItem
				title="Количество исследователей:"
				stat={explorerCount}
			/>
			<GalaxyStatisticsItem
				title="Количество хранителей:"
				stat={keeperCount}
			/>
		</div>
	);
};
