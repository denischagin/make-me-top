import { UserProgress } from '@entities/user/model/types';

import { SystemType } from '@entities/galaxy/model/types';

interface IGetPercentageProgress {
  system: SystemType;
  userProgress: UserProgress;
}

//функция получения значния из поля обьекта по индексу
export const getPercentageProgress = (params: IGetPercentageProgress): number => {
    const {
        system,
        userProgress,
    } = params;

    //получение прогресса определенной системы
    const educationSystem = userProgress.inProgressSystemList.find(
        (educationSystem) => {
            return educationSystem.systemId === system.systemId;
        },
    );

    if (!educationSystem) {
        return 0;
    }

    //прогресс найденной системы
    return educationSystem.completed;
};