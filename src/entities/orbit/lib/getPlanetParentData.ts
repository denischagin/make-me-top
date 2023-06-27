import { SystemType } from '@entities/galaxy/model/types';

//получение parent зависимостей планеты в определенном формате
export const getPlanetParentData = (planet: SystemType): Array<string> => {
    //преобразует данные parent зависимостей конкретной планеты в масив строк формата ["КодПланеты:ТипСвязи",...]
    //необходимо для присваивания в последующем в dataset атрибут
    return planet.systemDependencyList
        .filter((planet) => planet.type === 'parent')
        .map((planet) => {
            return `${planet.systemId}:${planet.isAlternative}`;
        });
};