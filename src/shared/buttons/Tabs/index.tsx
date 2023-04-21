import { useState } from "react";

import { bem } from "@shared/utils/bem";

import { TabsInterface, TabsListInterface } from "./interfaces";
import "./styles.scss";

export const Tabs = (props: TabsListInterface) => {
  const [block, element] = bem("tabs");
  const [tabs, setTabs] = useState(props.list);

  const handleTabClick = (index: number) => {
    setTabs(
      tabs.map((tab, i) => ({
        ...tab,
        active: i === index,
      }))
    );
  };

  return (
    <div className={block()}>
      {
        tabs.map((tab: TabsInterface, index) => (
          <div
            key={tab.title}
            className={element("button", { active: tab.active })}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </div>
        ))
      }
    </div>
  );
};