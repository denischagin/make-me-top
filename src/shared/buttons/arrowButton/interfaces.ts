import { Action, Dispatch } from "redux";

export interface ArrowButtonInterface {
  direction?: "top" | "bottom" | "left" | "right";
  action?: () => Dispatch<Action<boolean>>
}
