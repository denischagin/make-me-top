export interface ArrowButtonInterface {
  direction: arrowButtonDirection;
  onClick?: () => void;
}

export enum arrowButtonDirection {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right",
}
