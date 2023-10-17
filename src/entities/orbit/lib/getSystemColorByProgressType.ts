import { systemColor } from '@shared/ui/System/interfaces';

import { SystemProgressTypes } from '@shared/types/common';

interface getPlanetColorByProgress {
  systemProgressType?: string;
}

//функция получения цвета для компонета System по переданному типу прогресса системы
export const getSystemColorByProgressType = (
    params: getPlanetColorByProgress,
) => {
    const {
        systemProgressType,
    } = params;

    switch (systemProgressType) {
        case SystemProgressTypes.SYSTEM_OPEN: {
            return systemColor.white;
        }
        case SystemProgressTypes.SYSTEM_CLOSE: {
            return systemColor.black;
        }
        case SystemProgressTypes.SYSTEM_EDUCATION: {
            return systemColor.primary500;
        }
        case SystemProgressTypes.PROGRESS_NOT_FOUND: {
            return systemColor.black;
        }
        default: {
            return systemColor.black;
        }
    }
};