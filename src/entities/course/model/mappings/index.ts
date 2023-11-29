import { ModalPlanetInterface } from '@entities/user/model/types';
import { ExplorerProgressPlanetInterface } from '@entities/course';

export const mappingPlanetToTheme = ({
	planetId,
	planetNumber,
	planetName,
}: ModalPlanetInterface): ExplorerProgressPlanetInterface =>
	({
		courseThemeId: planetId,
		courseThemeNumber: planetNumber,
		title: planetName,
		completed: false
	});

export const mappingListPlanetToListTheme = (modalPlanets: ModalPlanetInterface[]): ExplorerProgressPlanetInterface[] =>
	(modalPlanets.map((planet) => mappingPlanetToTheme(planet)));
