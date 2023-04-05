export interface ButtonInterface {
  title: string;
  color: "filled" | "orange" | "black" | "white";
  action?: () => void;
}
