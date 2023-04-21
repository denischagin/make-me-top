export interface CurrentStarCardInterface {
  starInfo: CurrentStarItemInterface
  tabsList: Array<string>
}
interface CurrentStarItemInterface {
  planet: {
    id: number,
    name: string,
  },
  star: string,
  curator: string,
  progress: number,
}