import { ReactNode } from "react";

export interface ModalInterface {
  name: string;
  isLocked?: boolean;
  children: ReactNode;
}
