import { Tab, TabList, Tabs } from "react-tabs";

import { TabsListInterface } from "./interfaces";

import { TabInterface } from "@shared/types/common";

import "./styles.scss";

export const MmtTabs = (props: TabsListInterface) => {
	const { list = [], activeTab = undefined, setActiveTab, children } = props;

	const tabsList = (
		<>
			<TabList>
				{list.map((tab: TabInterface) => (
					<Tab key={tab.id}>{tab.name}</Tab>
				))}
			</TabList>
			{children}
		</>
	);

	return (
		<>
			{activeTab && setActiveTab ? (
				<Tabs selectedIndex={activeTab} onSelect={setActiveTab}>
					{tabsList}
				</Tabs>
			) : (
				<Tabs>{tabsList}</Tabs>
			)}
		</>
	);
};
