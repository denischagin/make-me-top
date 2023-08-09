import { UserProgress } from '@entities/user/model/types';

import { LastChosenSystem } from '@entities/galaxy/model/types';

// возвращает boolean в зависимоти от прогресса пользователя на определенной системе
// true - система закрыта; false - система открыта
export function isSystemLocked(userProgress: UserProgress, lastChosenStar: LastChosenSystem): boolean {
    return userProgress.closedSystemList.some(
        (closeSystemId) => closeSystemId === lastChosenStar.systemId,
    );
}