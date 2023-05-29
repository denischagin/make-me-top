import { ReactNode } from "react";

import { TabInterface } from "@shared/types/common";

export interface TabsListInterface {
  list: Array<TabInterface>;
  children: ReactNode;
}
