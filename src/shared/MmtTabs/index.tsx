import { Tab, TabList, Tabs } from "react-tabs";

import { TabInterface } from "@shared/types/common";

import { TabsListInterface } from "./interfaces";

import "./styles.scss";

export const MmtTabs = (props: TabsListInterface) => {
  const {
    list,
    children
  } = props;

  return (
    <Tabs>
      <TabList>
        {list.map((tab: TabInterface) => (
          <Tab key={tab.id}>
            {tab.name}
          </Tab>
        ))}
      </TabList>
      {children}
    </Tabs>
  );
};
