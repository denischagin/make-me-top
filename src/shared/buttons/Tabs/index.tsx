import { Tab, Tabs, TabList } from "react-tabs";

import { TabsListInterface } from "./interfaces";
import "./styles.scss";

export const TabsList = (props: TabsListInterface) => {
  const {
    list,
    children
  } = props;

  return (
    <Tabs>
      <TabList>
        {
          list.map((tab) => (
            <Tab key={tab}>
              {tab}
            </Tab>
          ))
        }
      </TabList>
      { children }
    </Tabs>
  );
};