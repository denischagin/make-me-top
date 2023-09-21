import { useState, useEffect } from "react";
import { CurrentGalaxyInterface } from "./interface";
import { GalaxyForGetAll } from "@entities/galaxy/model/types";

export const useCurrentGalaxy = (galaxies: GalaxyForGetAll[]) => {
	const [currentGalaxy, setCurrentGalaxy] =
		useState<CurrentGalaxyInterface | null>(null);

	useEffect(() => {
		if (galaxies.length > 0 && currentGalaxy === null) {
			setCurrentGalaxy({ ...galaxies[0], index: 0 });
		}
	}, [galaxies, currentGalaxy]);

	const isFirstGalaxy = currentGalaxy?.index === 0;
	const isLastGalaxy = currentGalaxy?.index === galaxies.length - 1;

	const lastGalaxy = galaxies[galaxies.length - 1];
	const firstGalaxy = galaxies[0];

	const prevGalaxyIndex = currentGalaxy ? currentGalaxy.index - 1 : 0;
	const nextGalaxyIndex = currentGalaxy ? currentGalaxy.index + 1 : 0;

	const prevGalaxy = currentGalaxy
		? galaxies[currentGalaxy.index - 1]
		: galaxies[0];
		
	const nextGalaxy = currentGalaxy
		? galaxies[currentGalaxy.index + 1]
		: galaxies[0];

	const handleSwitchCurrentGalaxy = (index: number) => {
		setCurrentGalaxy({ ...galaxies[index], index });
	};

	return {
		currentGalaxy,
		isFirstGalaxy,
		isLastGalaxy,
		lastGalaxy,
		firstGalaxy,
		prevGalaxyIndex,
		nextGalaxyIndex,
		prevGalaxy,
		nextGalaxy,
		handleSwitchCurrentGalaxy,
	};
};
