import { ReactNode } from "react";

export interface BadgeInterface {
  color: "primary-500" | "secondary-500" | "white" | "black"
  children: ReactNode
}
