import { UserProgress } from '@entities/user/model/types';

import { ErrorInterface } from '@shared/types/common';

export type SystemDependencyType = {
    systemId: number | null;
    type: 'child' | 'parent';
    isAlternative: boolean;
};

export type SystemType = {
    systemId: number;
    systemPosition: number;
    systemName: string;
    systemLevel: number;
    systemDependencyList: Array<SystemDependencyType>;
};

export type OrbitType = {
    orbitId: number;
    orbitLevel: number;
    systemCount: number;
    systemList: Array<SystemType>;
};

export type GalaxyState = {
    galaxyId: number;
    galaxyName: string;
    orbitList: Array<OrbitType>;
};

export type IGalaxyProps = {
    galaxyPage: HTMLDivElement | null;
    userProgress: UserProgress;
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

export interface IStarProgress {
    isLocked: boolean,
}

export interface ILastChosenStar extends SystemType, IStarProgress, ErrorInterface {}
