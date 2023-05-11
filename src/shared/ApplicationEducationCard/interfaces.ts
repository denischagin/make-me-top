export interface ApplicationEducationCardInterface {
  user: ApplicationInterface
}

export interface ApplicationInterface {
  name: string
  avatar: string
  planet: string
  rating?: number | null;
  id?: number
}