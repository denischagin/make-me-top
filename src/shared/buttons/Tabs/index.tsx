import { useState } from "react";

import { bem } from "@shared/utils/bem";

import { TABS } from "./model";
import "./styles.scss";

export const Tabs = () => {
  const [tabs, setTabs] = useState(TABS);
  const [block, element] = bem("tabs");

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
      {tabs.map((tab, index) => (
        <div
          key={tab.title}
          className={element("button", { active: tab.active })}
          onClick={() => handleTabClick(index)}
        >
          {tab.title}
        </div>
      ))}
    </div>
  );
};