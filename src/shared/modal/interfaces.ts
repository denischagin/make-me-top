import { ReactNode } from "react";

export interface ModalInterface {
  name: string;
  locked: boolean;
  children: ReactNode;
}
