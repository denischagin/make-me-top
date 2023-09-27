import {
    SystemType,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

interface IGetPercentageProgress {
  system: SystemType;
  userProgress: UserProgressInGalaxy;
}

//функция получения значния из поля обьекта по индексу
export const getPercentageProgress = (params: IGetPercentageProgress): number => {
    const {
        system,
        userProgress,
    } = params;


    //получение прогресса определенной системы
    const educationSystem = userProgress.studiedSystems.find(
        (educationSystem) => {
            return educationSystem.systemId === system.systemId;
        },
    );

    if (!educationSystem) {
        return 0;
    }

    //прогресс найденной системы
    return educationSystem.progress;
};