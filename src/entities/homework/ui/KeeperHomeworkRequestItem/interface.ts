import { HomeworkRequestWithExplorerInfo } from '@entities/homework/model/types/api';

export interface KeeperHomeworkRequestItemProps extends HomeworkRequestWithExplorerInfo {
    handleNavigateToRequest: () => void;

}