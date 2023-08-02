import { UserProgress } from '@entities/user/model/types';

import { ILastChosenStar } from '@entities/galaxy/model/types';

import { getRequiredStars } from '@shared/utils/getRequiredStars';

import { ModalAccessStatus } from '@shared/CircleModal/interfaces';

interface GetModalStatus {
    lastChosenStar: ILastChosenStar,
    userProgress: UserProgress,
}

export function getModalStatus(params: GetModalStatus): ModalAccessStatus {
    const {
        lastChosenStar,
        userProgress,
    } = params;

    const notStudiedParentDependencies = getRequiredStars({
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