export interface ButtonInterface {
  title: string;
  color?: "filled" | "orange" | "black";
  action?: () => void;
}
