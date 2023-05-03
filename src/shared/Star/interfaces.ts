import { ReactNode } from "react";

import { StarColor } from "@shared/types/enums";

export interface StarInterface {
  color: StarColor
  children: ReactNode;
}
