import {SystemType} from "@entities/Galaxy/model/types";
import {UserProgress} from "@entities/user/model/types";
import {PlanetProgressTypes} from "@shared/types/common";

interface IGetPlanetProgress {
    planet: SystemType,
    userProgress: UserProgress,
}

export const getPlanetProgressType = (params: IGetPlanetProgress) => {
    const {
        planet,
        userProgress
    } = params

    const isSystemOpen = userProgress.openSystemList.findIndex(openSystemId => {
        return openSystemId === planet.systemId;
    })

    if (isSystemOpen > -1) {
        return PlanetProgressTypes.SYSTEM_OPEN;
    }

    const isSystemClose = userProgress.closeSystemList.findIndex(closeSystemId => {
        return closeSystemId === planet.systemId;
    })

    if (isSystemClose > -1) {
        return PlanetProgressTypes.SYSTEM_CLOSE;
    }

    const isSystemEducation = userProgress.educationSystemList.findIndex(educationSystemId => {
        return educationSystemId.systemId === planet.systemId;
    })

    if (isSystemEducation > -1) {
        return PlanetProgressTypes.SYSTEM_EDUCATION;
    }

    return PlanetProgressTypes.PROGRESS_NOT_FOUND
};