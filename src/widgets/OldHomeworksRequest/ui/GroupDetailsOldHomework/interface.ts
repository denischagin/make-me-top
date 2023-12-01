import { HomeworkInterfaceGroupExplorer, HomeworkRequestWithExplorerInfo } from '@entities/homework/model/types/api';

export interface GroupDetailsOldHomeworkProps {
	content: string;
	explorers: HomeworkInterfaceGroupExplorer[];
	requests: HomeworkRequestWithExplorerInfo[];
}