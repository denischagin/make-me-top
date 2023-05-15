import {SystemType} from "@entities/Galaxy/model/types";
import {UserProgress} from "@entities/user/model/types";

interface IGetPercentageProgress {
    planet: SystemType,
    userProgress: UserProgress,
}

export const getPercentageProgress = (params: IGetPercentageProgress): number => {
    const {
        planet,
        userProgress
    } = params

    const isSystemEducation = userProgress.educationSystemList.findIndex(educationSystemId => {
        return educationSystemId.systemId === planet.systemId;
    });

    if (isSystemEducation > -1) {
        const educationSystem = userProgress.educationSystemList.find(educationSystem => {
            return educationSystem.systemId === planet.systemId;
        });

        console.log(educationSystem?.completed)
        return educationSystem?.completed || 0;
    }

    const isSystemOpen = userProgress.openSystemList.findIndex(openSystemId => {
        return openSystemId === planet.systemId;
    });

    if (isSystemOpen > -1) {
        return 0;
    }

    const isSystemClose = userProgress.closeSystemList.findIndex(closeSystemId => {
        return closeSystemId === planet.systemId;
    });

    if (isSystemClose > -1) {
        return 0;
    }

    return 0;
};