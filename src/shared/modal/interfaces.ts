import { ReactNode } from "react";

export interface ModalInterface {
  modalName: string;
  locked: boolean;
  children: ReactNode;
}
