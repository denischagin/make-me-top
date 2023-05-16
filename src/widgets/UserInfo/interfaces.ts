export interface UserInfoInterface {
  name: string
  avatar: string
  rating: number | null;
  id?: number
  stars?: number | null;
  reviews?: number | null;
  planets?: number | null;
  explorers?: number | null;
}