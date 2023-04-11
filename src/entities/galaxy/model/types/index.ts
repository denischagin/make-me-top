export type SystemDependencyType = {
  planetId: number | null;
  type: "child" | "parent";
  isAlternative: boolean;
};

export type SystemType = {
  systemId: number;
  positionSystem: number;
  systemName: string;
  systemLevel: number;
  systemDependencyList: Array<SystemDependencyType>
};

export type OrbitType = {
  orbitId: number;
  orbitLevel: number;
  positionCount: number;
  systemList: Array<SystemType>;
};

export type GalaxyType = {
  galacticId: number;
  galacticName: string;
  orbitList: Array<OrbitType>;
};
