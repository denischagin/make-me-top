export interface CurrentStarCardInterface {
  starInfo: CurrentStarItemInterface
  tabsList: Array<TabsListInterface>
}

interface TabsListInterface {
  title: string
  active: boolean
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