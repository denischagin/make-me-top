export interface ExplorerState {
  isExplorer: boolean;
  planetList: Array<ModalPlanetInterface>
}

export interface ModalPlanetInterface {
  planetId: number,
  planetName: string,
  systemId: number
}
