import { UserProgress } from '@entities/user/model/types';

import {
    ILastChosenStar,
    SystemDependencyType,
} from '@entities/galaxy/model/types';

interface GetRequiredStars {
    lastChosenStar: ILastChosenStar,
    userProgress: UserProgress,
}
export function getRequiredStars(params: GetRequiredStars): Array<SystemDependencyType> {
    const {
        lastChosenStar,
        userProgress,
    } = params;

    //все зависимости с типом parent
    const parentDependencies = lastChosenStar.systemDependencyList.filter((dependency) => dependency.type === 'parent');

    //console.log(lastChosenStar.systemDependencyList);

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

// создать массив обьектов {id, name}
// id забрать из lastChosenStar.systemDependencyList[].systemId
// name забрать с метода fetchSystemById().systemName
// каждый обект должен соотв условиям:
//      зависимость child,
//      наличие id в одном из массивов userProgress, кроме массива InProgressSystemType с полем completed === 100.
//      не должен быть undefined

// замапить с id = 0, убрать некоторые элементы позже
// работраться с промисами, нужна data