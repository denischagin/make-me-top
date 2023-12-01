import { HomeworkRequestWithExplorerInfo } from '@entities/homework/model/types/api';

export interface GroupDetailsCurrentHomeworkProps {
	homeworkId: number
	content: string;
	onShowMoreClick?: (homeworkId: number) => void;
	requests: HomeworkRequestWithExplorerInfo[],
}