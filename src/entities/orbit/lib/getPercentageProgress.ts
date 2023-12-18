import {
    SystemType,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

interface IGetPercentageProgress {
    system: SystemType;
    userProgress: UserProgressInGalaxy;
}

//функция получения значния из поля обьекта по индексу
export const getPercentageProgress = (params: IGetPercentageProgress): number | undefined => {
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
        return undefined;
    }

    //прогресс найденной системы
    return educationSystem.progress;
};