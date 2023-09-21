import { Tab, TabList, Tabs } from "react-tabs";

import { TabsListInterface } from "./interfaces";

import { TabInterface } from "@shared/types/common";

import "./styles.scss";

export const MmtTabs = (props: TabsListInterface) => {
	const { list = [], activeTab, setActiveTab, children } = props;

	return (
		<Tabs
			selectedIndex={activeTab}
			onSelect={setActiveTab ? (index) => setActiveTab(index) : undefined}
		>
			<TabList>
				{list.map((tab: TabInterface) => (
					<Tab key={tab.id}>{tab.name}</Tab>
				))}
			</TabList>
			{children}
		</Tabs>
	);
};
