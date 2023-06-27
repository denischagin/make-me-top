export type SystemDependencyType = {
    systemId: number | null;
    type: 'child' | 'parent';
    isAlternative: boolean;
};

export type SystemType = {
    systemId: number;
    positionSystem: number;
    systemName: string;
    systemLevel: number;
    systemDependencyList: Array<SystemDependencyType>;
};

export type OrbitType = {
    orbitId: number;
    levelOrbit: number;
    countSystem: number;
    galaxyId: number;
    systemList: Array<SystemType>;
};

export type GalaxyType = {
    galaxyId: number;
    galaxyName: string;
    orbitList: Array<OrbitType>;
};
