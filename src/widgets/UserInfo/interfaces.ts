import { ReactNode } from "react";

export interface UserDataInterface {
  name: string
  avatar: string
  rating?: number | null;
  id?: number
  children: ReactNode
}