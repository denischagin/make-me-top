export interface PlanetInterface {
  name: string
  locked: boolean
  id: number
}

export interface PlanetListInterface {
  list: Array<PlanetInterface>
  currentPlanet?: string
}
