import { ButtonColor, ButtonSize } from "@shared/types/enums";

export interface ButtonInterface {
  title: string;
  color?: ButtonColor;
  size: ButtonSize
  action?: () => void;
}
