import { UserProgress } from '@entities/user/model/types';

import { ILastChosenStar } from '@entities/galaxy/model/types';

// возвращает boolean в зависимоти от прогресса пользователя на определенной системе
// true - система закрыта; false - система открыта
export function isStarLocked(userProgress: UserProgress, lastChosenStar: ILastChosenStar): boolean {
    return userProgress.closedSystemList.some(
        (closeSystemId) => closeSystemId === lastChosenStar.systemId,
    );
}