import {
    LastChosenSystem,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

// возвращает boolean в зависимоти от прогресса пользователя на определенной системе
// true - система закрыта; false - система открыта
export function isSystemLocked(userProgress: UserProgressInGalaxy, lastChosenStar: LastChosenSystem): boolean {
    return userProgress.closedSystems.some(
        (closeSystemId) => closeSystemId === lastChosenStar.systemId,
    );
}