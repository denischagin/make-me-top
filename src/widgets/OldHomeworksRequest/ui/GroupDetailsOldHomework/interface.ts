import { HomeworkInterfaceGroupExplorer, HomeworkInterfaceHomeworkRequest } from '@entities/homework/model/types/api';

export interface GroupDetailsOldHomeworkProps {
	content: string;
	explorers: HomeworkInterfaceGroupExplorer[];
	requests: HomeworkInterfaceHomeworkRequest[];
}