import { UserProgress } from '@entities/user/model/types';

import { DEFAULT_CHOSEN_STAR } from '@entities/galaxy/model/constants';
import { ILastChosenStar } from '@entities/galaxy/model/types';

import { getNotStudiedParentDependencies } from '@shared/utils/getNotStudiedParentDependencies';

import { ModalAccessStatus } from '@shared/CircleModal/interfaces';

interface GetModalStatus {
    lastChosenStar: ILastChosenStar,
    userProgress: UserProgress,
}

//функция получения статуса модального окна в зависимоти от данных пользователя и последней выбранной системы
export function getModalStatus(params: GetModalStatus): ModalAccessStatus {
    const {
        lastChosenStar,
        userProgress,
    } = params;

    if (lastChosenStar.systemId === DEFAULT_CHOSEN_STAR.systemId) {
        return ModalAccessStatus.opened;
    }

    const notStudiedParentDependencies = getNotStudiedParentDependencies({
        lastChosenStar,
        userProgress,
    });

    if (notStudiedParentDependencies.length) {
        return ModalAccessStatus.closed_needStars;
    }

    const isSystemInStudy = userProgress.inProgressSystemList.some(system => system.systemId === lastChosenStar.systemId);

    if (!isSystemInStudy) {
        return ModalAccessStatus.closed_choseKeeper;
    }

    return ModalAccessStatus.opened;
}