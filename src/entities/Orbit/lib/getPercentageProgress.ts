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

        return educationSystem?.completed || 0;
    }

    return 0;
};