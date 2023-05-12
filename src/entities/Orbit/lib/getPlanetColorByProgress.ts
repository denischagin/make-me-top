import {starColor} from "@shared/Star/interfaces";
interface getPlanetColorByProgress {
    planetProgress: string
}

export const getPlanetColorByProgress = (params: getPlanetColorByProgress) => {
    const {
        planetProgress,
    } = params

    switch (planetProgress) {
        case "systemOpen": {
            return starColor.white;
        }
        case "systemClose": {
            return starColor.black;
        }
        case "systemEducation": {
            return starColor.primary500;
        }
        default: {
            return starColor.black;
        }
    }
};