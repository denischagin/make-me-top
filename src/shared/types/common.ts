export interface TabInterface {
  name: string
  id: number
}

export interface AvatarInterface {
  image: string;
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
