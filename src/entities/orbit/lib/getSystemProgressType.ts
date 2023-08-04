import { UserProgress } from '@entities/user/model/types';

import { SystemType } from '@entities/galaxy/model/types';

import { SystemProgressTypes } from '@shared/types/common';

interface IGetPlanetProgress {
  system: SystemType;
  userProgress: UserProgress;
}

//функция получения типа прогресса системы по прогрессу пользоватея
export const getSystemProgressType = (params: IGetPlanetProgress) => {
    const {
        system,
        userProgress,
    } = params; //todo срабатывает 48 раз при наведеии/анфокусе

    const isSystemOpen = userProgress.openedSystemList.some(
        (openSystemId) => openSystemId === system.systemId,
    );

    if (isSystemOpen) {
        return SystemProgressTypes.SYSTEM_OPEN;
    }

    const isSystemClose = userProgress.closedSystemList.some(
        (closeSystemId) => closeSystemId === system.systemId,
    );

    if (isSystemClose) {
        return SystemProgressTypes.SYSTEM_CLOSE;
    }

    const isSystemEducation = userProgress.inProgressSystemList.some(
        (educationSystemId) => educationSystemId.systemId === system.systemId,
    );

    if (isSystemEducation) {
        return SystemProgressTypes.SYSTEM_EDUCATION;
    }

    return SystemProgressTypes.PROGRESS_NOT_FOUND;
};
