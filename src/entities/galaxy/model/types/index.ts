export type SystemParentType = {
    parent_id: number | null,
    isAlternative: boolean,
}

export type PlanetType = {
    systemId: number,
    positionSystem: number,
    systemName: string,
    systemLevel: number,
    systemParentList: Array<SystemParentType>,
    systemChildList: Array<number>,
}

export type OrbitType = {
    orbitId: number,
    orbitLevel: number,
    positionCount: number,
    listPlanet: Array<PlanetType>
}

export type GalaxyType = {
    galacticId: number,
    galacticName: string,
    orbitList: Array<OrbitType>
}