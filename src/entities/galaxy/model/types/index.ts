import { StudiedSystems } from '@entities/user/model/types';

import { ErrorInterface } from '@shared/types/common';

interface PersonInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
}

export interface SystemDependencyType {
    systemId: number | null;
    systemName: string;
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

export interface UserProgressInGalaxy extends PersonInterface {
    openedSystems: Array<number>;
    closedSystems: Array<number>;
    studiedSystems: Array<StudiedSystems>;
}

export interface IGalaxyProps {
    galaxyPage: HTMLDivElement | null;
    userProgress?: UserProgressInGalaxy;
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

interface Explorer {
}

export interface KeeperForGalaxies {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    rating: number;
    systems: number[];
}

export interface GalaxyBaseInfo {
    galaxyName: string;
    galaxyDescription: string;
    galaxyId: number;
}

export interface GalaxyFullInfo extends GalaxyBaseInfo {
    systemCount: number;
    explorerCount: number;
    keeperCount: number;
    keepers: KeeperForGalaxies[];
}

export interface LastChosenSystem
    extends SystemType,
        SystemProgress,
        ErrorInterface {
}

export interface GalaxyResponseInterface extends GalaxyState, ErrorInterface {
}

export interface GalaxyResponseDetailedInterface extends GalaxyFullInfo {
}

export interface GetUserProgressInGalaxyResponse
    extends UserProgressInGalaxy,
        ErrorInterface {
}

export interface GetSystemsBySystemIdAgruments {
    withDependencies: boolean;
    systemId: number;
}

export interface GetSystemsBySystemIdResponse extends SystemType {
}

export interface ProgressPlanetInterface {
    courseThemeId: number;
    title: string;
    completed: boolean;
}

export interface GetExplorerProgressByExplorerIdResponse {
    courseId: number;
    title: string;
    planets: ProgressPlanetInterface[];
}
