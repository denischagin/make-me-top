import { ReactNode } from "react";

import { TypographyColor, TypographyVariant } from "@shared/types/enums";

export interface TypographyInterface {
  children: ReactNode;
  variant: TypographyVariant
  color?: TypographyColor
}
