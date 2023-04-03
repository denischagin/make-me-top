import { Dispatch, Action } from "redux";

export interface ButtonInterface {
  title: string;
  color?: "filled" | "orange" | "black";
  action?: () => Dispatch<Action<boolean>>;
}
