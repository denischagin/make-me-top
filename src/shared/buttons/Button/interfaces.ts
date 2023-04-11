export interface ButtonInterface {
  title: string;
  color?: "filled" | "primary-500" | "black";
  size: "small" | "large";
  action?: () => void;
}
