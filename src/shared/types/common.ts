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
  id: number
}

export interface UserListInterface {
  list: Array<UserInterface>
}
export interface ExplorerCardInterface {
  name: string
  avatar: string
  id?: number
}

export interface EducationApplicationInterface {
  name: string
  avatar: string
  planet: string
  rating?: number | null;
  id?: number
}

export interface GradeApplicationInterface {
  name: string
  avatar: string
  star: string
  planet: string
  rating?: number | null;
  id?: number
}