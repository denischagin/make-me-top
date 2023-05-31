import {starColor} from "@shared/Star/interfaces";
import {PlanetProgressTypes} from "@shared/types/common";
interface getPlanetColorByProgress {
    planetProgressType: string
}

export const getPlanetColorByProgressType = (params: getPlanetColorByProgress) => {
    const {
        planetProgressType,
    } = params

    switch (planetProgressType) {
        case PlanetProgressTypes.SYSTEM_OPEN: {
            return starColor.white;
        }
        case PlanetProgressTypes.SYSTEM_CLOSE: {
            return starColor.black;
        }
        case PlanetProgressTypes.SYSTEM_EDUCATION: {
            return starColor.white;
        }
        case PlanetProgressTypes.PROGRESS_NOT_FOUND: {
            return starColor.black;
        }
        default: {
            return starColor.black;
        }
    }
};