import {
    LastChosenSystem,
    SystemDependencyType,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

import { MAX_STUDYING_PROGRESS } from '@shared/types/common';

interface GetNotStudiedParentDependencies {
    lastChosenStar: LastChosenSystem,
    userProgress: UserProgressInGalaxy,
}

//фукнция фильтрации списка зависимотей системы
//будут исключены все элементы с прогрессом 100%
//и типом зависимости - не parent
export function getNotStudiedParentDependencies(params: GetNotStudiedParentDependencies): Array<SystemDependencyType> {
    const {
        lastChosenStar,
        userProgress,
    } = params;

    //все зависимости с типом parent
    const parentDependencies = lastChosenStar.systemDependencyList.filter((dependency) => dependency.type === 'parent');

    //зависимости с типом parent, у которых прогресс не 100%
    const notStudiedParentDependencies = parentDependencies.filter((dependency) => {
        const isCurrentDependencyStudied = userProgress.studiedSystems.some((system) =>
            (
                (system.systemId === dependency.systemId) &&
                (system.completed === MAX_STUDYING_PROGRESS)
            ),
        );

        return !isCurrentDependencyStudied;
    });

    return notStudiedParentDependencies;
}