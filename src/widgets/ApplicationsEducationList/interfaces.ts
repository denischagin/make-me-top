export interface ApplicationEducationInterface {
  applications: Array<ApplicationInterface>
}

export interface ApplicationInterface {
  name: string
  avatar: string
  planet: string
  rating?: number | null;
  id?: number
}