export interface ButtonInterface {
  title: string;
  color?: "filled" | "orange" | "black";
  size: "small" | "large";
  action?: () => void;
}
