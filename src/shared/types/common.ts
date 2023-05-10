export interface TabInterface {
  name: string
  id: number
}

export interface UserInfoInterface {
  user: UserInterface
}

export interface UserInterface {
  name: string
  avatar: string
  rating?: number | null;
  id?: number
}
