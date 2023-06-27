import { UserProgress } from '@entities/user/model/types';

import { SystemType } from '@entities/galaxy/model/types';

interface IsChosenStarClosed {
  userProgress: UserProgress;
  lastChosenStar: SystemType;
}

export const isChosenStarClosed = (params: IsChosenStarClosed): boolean => {
    const {
        userProgress,
        lastChosenStar,
    } = params;

    return userProgress.closeSystemList.some(
        (closeSystemId) => closeSystemId === lastChosenStar.systemId,
    );
};