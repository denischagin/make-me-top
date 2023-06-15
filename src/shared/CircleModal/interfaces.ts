import { ReactNode } from "react";

export interface ModalInterface {
  header: string;
  isLocked?: boolean;
  children: ReactNode;
  onClose: (dispatch: any) => any
}
