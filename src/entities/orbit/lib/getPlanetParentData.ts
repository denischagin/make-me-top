import {SystemType} from "@entities/galaxy/model/types";

export const getPlanetParentData = (planet: SystemType): Array<string> => {

    return planet.systemDependencyList.filter(planet => planet.type === "parent").map(planet => {

        return `${ planet.planetId }:${ planet.isAlternative }`;
    });
};
