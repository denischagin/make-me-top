import { RequestStatusType } from '@entities/homework/model/types/api';

export interface ExplorerBadgeByRequestStatusProps {
    mark?: number;
    requestStatus?: RequestStatusType;
    alreadyHaveMarkOnTheme?: boolean;
}