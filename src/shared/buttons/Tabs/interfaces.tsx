import { Dispatch, SetStateAction } from "react";

export interface TabsListInterface {
  list: Array<string>
  setCurrentTab: Dispatch<SetStateAction<string>>
}

