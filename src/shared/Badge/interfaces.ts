import { ReactNode } from "react";

export interface BadgeInterface {
  color: badgeColor
  children: ReactNode
}

export enum badgeColor {
  primary500 = "primary-500",
  secondary500 = "secondary-500",
  white = "white",
  black = "black"
}