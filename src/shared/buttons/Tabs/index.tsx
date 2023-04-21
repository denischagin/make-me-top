import { Tab, Tabs, TabList } from "react-tabs";

import { TabsListInterface } from "./interfaces";
import "./styles.scss";

export const TabsList = (props: TabsListInterface) => {
  const {
    list,
    setCurrentTab
  } = props;

  return (
    <Tabs onSelect={(index) => setCurrentTab(props.list[index])}>
      <TabList>
        {
          list.map((tab) => (
            <Tab key={tab}>
              {tab}
            </Tab>
          ))
        }
      </TabList>
    </Tabs>
  );
};