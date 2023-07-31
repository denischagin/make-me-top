import { UserProgress } from '@entities/user/model/types';

import { ILastChosenStar } from '@entities/galaxy/model/types';

export function getStarStatus(userProgress: UserProgress, lastChosenStar: ILastChosenStar): boolean {
    const isSystemClose  = userProgress.closedSystemList.some(
        (closeSystemId) => closeSystemId === lastChosenStar.systemId,
    );

    return isSystemClose;
}