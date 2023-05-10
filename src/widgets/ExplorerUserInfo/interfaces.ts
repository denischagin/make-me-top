export interface ExplorerUserInfoInterface {
  user: ExplorerInterface
}

export interface ExplorerInterface {
  name: string
  avatar: string
  rating?: number | null;
  id?: number
  stars: number | null;
}