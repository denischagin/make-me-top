import { ReactNode } from "react";

export interface CardInterface {
  children: ReactNode
  size: CardSize
}

export enum CardSize {
  small = "small",
  medium = "medium",
  large = "large"
}