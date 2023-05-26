export interface ReviewInterface {
  planet: string
  rating: number
  name: string
  avatar: string
  review: string
  id?: number
}


export interface CuratorState {
  isCurator: boolean;
  reviews: Array<ReviewInterface>
}
