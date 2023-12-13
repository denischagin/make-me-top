import { HomeworkRequestWithExplorerInfo } from '@entities/homework/model/types/api';

export interface GroupDetailsCurrentHomeworkProps {
    homeworkId: number
    content: string;
    title: string;
    onShowMoreClick?: (homeworkId: number) => void;
    requests: HomeworkRequestWithExplorerInfo[],
    isClosed?: boolean
}