import { ReactNode } from "react";

export interface StarInterface {
  color: starColor,
  children: ReactNode,
  percentageProgress?: number,
}

export enum starColor {
  primary500 = "primary-500",
  white = "white",
  black = "black"
}
