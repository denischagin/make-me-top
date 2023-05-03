import { ReactNode } from "react";

import { BadgeColor } from "@shared/types/enums";

export interface BadgeInterface {
  color: BadgeColor
  children: ReactNode
}