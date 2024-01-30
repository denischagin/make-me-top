import { RequestStatusType } from '@entities/homework/model/types/api';

export interface ExplorerBadgeByRequestStatusProps {
    requestStatus?: RequestStatusType;
    alreadyHaveMarkOnTheme?: boolean;
}