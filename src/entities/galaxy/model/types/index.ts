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
