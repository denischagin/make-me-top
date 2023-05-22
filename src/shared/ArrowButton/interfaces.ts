export interface ArrowButtonInterface {
  direction: arrowButtonDirection;
  action?: () => void;
}

export enum arrowButtonDirection {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}
