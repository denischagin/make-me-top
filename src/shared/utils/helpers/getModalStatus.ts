import { DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE } from '@entities/galaxy/model/constants';
import {
    LastChosenSystem,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

import { getNotStudiedParentDependencies } from '@shared/utils/helpers/getNotStudiedParentDependencies';

import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';

interface GetModalStatus {
    lastChosenSystemId?: number | null;
    userProgress?: UserProgressInGalaxy;
}

//функция получения статуса модального окна в зависимоти от данных пользователя и последней выбранной системы
export function getModalStatus(params: GetModalStatus): ModalAccessStatus {
    const { lastChosenSystemId, userProgress } = params;

    if (lastChosenSystemId === DEFAULT_CHOSEN_SYSTEM_WITH_RESPONSE.systemId) {
        return ModalAccessStatus.opened;
    }

    // const notStudiedParentDependencies = getNotStudiedParentDependencies({
    //     lastChosenSystem,
    //     userProgress,
    // });

    // if (notStudiedParentDependencies.length) {
    //     return ModalAccessStatus.closed_needSystems;
    // }

    const isSystemInStudy = userProgress?.studiedSystems.some(
        (system) => system.systemId === lastChosenSystemId,
    );

    if (!isSystemInStudy) {
        return ModalAccessStatus.closed_choseKeeper;
    }

    return ModalAccessStatus.opened;
}
