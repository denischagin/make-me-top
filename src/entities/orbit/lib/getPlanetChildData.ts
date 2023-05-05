import {SystemType} from "@entities/galaxy/model/types";

export const getPlanetChildData = (planet: SystemType): Array<string> => {

    return planet.systemDependencyList.filter(planet => planet.type === "child").map(planet => {

        return `${ planet.planetId }:${ planet.isAlternative }`;
    });
};
