import {SystemType} from "@entities/Galaxy/model/types";
import {UserProgress} from "@entities/user/model/types";

interface IGetPlanetProgress {
    planet: SystemType,
    userProgress: UserProgress,
}

export const getPlanetProgress = (params: IGetPlanetProgress) => {
    const {
        planet,
        userProgress
    } = params

    const isSystemOpen = userProgress.openSystemList.findIndex(openSystemId => {
        return openSystemId === planet.systemId;
    })

    if (isSystemOpen > -1) {
        return "systemOpen";
    }

    const isSystemClose = userProgress.closeSystemList.findIndex(closeSystemId => {
        return closeSystemId === planet.systemId;
    })

    if (isSystemClose > -1) {
        return "systemClose";
    }

    const isSystemEducation = userProgress.educationSystemList.findIndex(educationSystemId => {
        return educationSystemId.systemId === planet.systemId;
    })

    if (isSystemEducation > -1) {
        return "systemEducation";
    }

    return "progressNotFound"
};