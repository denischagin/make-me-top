export interface CuratorApplicationInterface {
  applications: ApplicationInterface
}

export interface ApplicationInterface {
  name: string
  avatar: string
  planet: string
  rating?: number | null;
  id?: number
}