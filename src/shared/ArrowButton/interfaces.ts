import { ArrowButtonDirection } from "@shared/types/enums";

export interface ArrowButtonInterface {
  direction: ArrowButtonDirection
  action?: () => void;
}
