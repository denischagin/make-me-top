import {
    CourseInfoInterface,
} from '@entities/user/model/types';

import { DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE } from '@entities/galaxy/model/constants';
import {
    LastChosenSystem,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

import { getNotStudiedParentDependencies } from '@shared/utils/getNotStudiedParentDependencies';

import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';

interface GetModalStatus {
    lastChosenSystem: LastChosenSystem,
    userProgress: UserProgressInGalaxy,
    courseInfo: CourseInfoInterface,
}

//функция получения статуса модального окна в зависимоти от данных пользователя и последней выбранной системы
export function getModalStatus(params: GetModalStatus): ModalAccessStatus {
    const {
        lastChosenSystem,
        userProgress,
        courseInfo,
    } = params;

    if (lastChosenSystem.systemId === DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE.systemId) {
        return ModalAccessStatus.opened;
    }

    const notStudiedParentDependencies = getNotStudiedParentDependencies({
        lastChosenSystem,
        userProgress,
    });

    if (notStudiedParentDependencies.length) {
        return ModalAccessStatus.closed_needSystems;
    }

    if (courseInfo.yourKeeper && courseInfo.yourKeeper.keeperId) {
        return ModalAccessStatus.opened;
    }

    const isSystemInStudy = userProgress.studiedSystems.some(system => system.systemId === lastChosenSystem.systemId);

    if (!isSystemInStudy) {
        return ModalAccessStatus.closed_choseKeeper;
    }

    return ModalAccessStatus.opened;
}