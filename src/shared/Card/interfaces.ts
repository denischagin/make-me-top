import { ReactNode } from "react";

export interface CardInterface {
  children: ReactNode;
  size: cardSize;
}

export enum cardSize {
  small = "small",
  medium = "medium",
  large = "large",
}
