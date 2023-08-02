import { UserProgress } from '@entities/user/model/types';

import {
    ILastChosenStar,
    SystemDependencyType,
} from '@entities/galaxy/model/types';

interface GetRequiredStars {
    lastChosenStar: ILastChosenStar,
    userProgress: UserProgress,
}

//фукнция фильтрации списка зависимотей системы
//будут исключены все элементы с прогрессом 100%
//и типом зависимости - parent
export function getRequiredStars(params: GetRequiredStars): Array<SystemDependencyType> {
    const {
        lastChosenStar,
        userProgress,
    } = params;

    //все зависимости с типом parent
    const parentDependencies = lastChosenStar.systemDependencyList.filter((dependency) => dependency.type === 'parent');

    //зависимости с типом parent, у которых прогресс не 100%
    const notStudiedParentDependencies = parentDependencies.filter((dependency) => {
        const isCurrentDependencyStudied = userProgress.inProgressSystemList.some((system) =>
            (
                (system.systemId === dependency.systemId) &&
                (system.completed === 100)
            ),
        );

        return !isCurrentDependencyStudied;
    });

    return notStudiedParentDependencies;
}