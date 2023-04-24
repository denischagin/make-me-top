import { TabInterface } from "@shared/types/common";
import { ReactNode } from "react";

export interface TabsListInterface {
  list: Array<TabInterface>;
  children: ReactNode;
}

