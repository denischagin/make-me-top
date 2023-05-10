export interface CuratorInterface {
  curator: CuratorUserInterface
}

export interface CuratorUserInterface {
  name: string
  avatar: string
  rating?: number | null;
  id?: number
  planets: number | null;
  explorers: number | null;
}