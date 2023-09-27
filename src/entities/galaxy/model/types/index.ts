import { StudiedSystems } from '@entities/user/model/types';

import { KeeperCardInfoInterface } from '@entities/keeper/model/types/interfaces';

import { ErrorInterface } from '@shared/types/common';

export interface SystemDependencyType {
	systemId: number | null;
	type: 'child' | 'parent';
	isAlternative: boolean;
}

export interface SystemType {
	systemId: number;
	systemPosition: number;
	systemName: string;
	systemLevel: number;
	systemDependencyList: Array<SystemDependencyType>;
}

export interface OrbitType {
	orbitId: number;
	orbitLevel: number;
	systemCount: number;
	systemList: Array<SystemType>;
}

export interface GalaxyState {
	galaxyId: number;
	galaxyName: string;
	orbitList: Array<OrbitType>;
	userProgress: UserProgressInGalaxy;
}

export interface UserProgressInGalaxy {
	openedSystems: Array<number>;
	closedSystems: Array<number>;
	studiedSystems: Array<StudiedSystems>;
}

export interface IGalaxyProps {
	galaxyPage: HTMLDivElement | null;
	userProgress: UserProgressInGalaxy;
	orbitList: Array<OrbitType>;
	svgContainerClass: string;
	width: number;
	height: number;
	systemWidth?: number;
	systemHeight?: number;
}

export interface IOrbitSettings {
	width: number;
	systemWidth: number;
	backgroundWidth: number;
	height: number;
	systemHeight: number;
	backgroundHeight: number;
}

export interface SystemProgress {
	isLocked: boolean;
}

interface Explorer {}

export interface KeeperForGalaxies {
	personId: number;
	firstName: string;
	lastName: string;
	patronymic: string;
	rating: number;
	systems: number[];
}

export interface GalaxyForGetAll {
	galaxyName: string;
	galaxyDescription: string;
	galaxyId: number;
	systemCount: number;
	explorerCount: number;
	keeperCount: number;
	keepers: KeeperForGalaxies[];
}

export interface LastChosenSystem
	extends SystemType,
		SystemProgress,
		ErrorInterface {}
