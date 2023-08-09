import { UserProgress } from '@entities/user/model/types';

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
}

export interface IGalaxyProps {
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

export interface SystemProgress {
    isLocked: boolean,
}

export interface LastChosenSystem extends SystemType, SystemProgress, ErrorInterface {}
