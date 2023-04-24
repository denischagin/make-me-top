import { TabInterface } from "@shared/api/types";
import { ReactNode } from "react";

export interface TabsListInterface {
  list: Array<TabInterface>;
  children: ReactNode;
}

