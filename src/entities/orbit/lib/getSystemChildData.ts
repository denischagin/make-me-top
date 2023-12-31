import { SystemType } from '@entities/galaxy/model/types';

//получение child зависимостей планеты в определенном формате
export const getSystemChildData = (planet: SystemType): Array<string> => {
    //преобразует данные child зависимостей конкретной планеты в масив строк формата ["КодПланеты:ТипСвязи",...]
    //необходимо для присваивания в последующем в dataset атрибут
    return planet.systemDependencyList
        .filter((planet) => planet.type === 'child')
        .map((planet) => {
            return `${planet.systemId}:${planet.isAlternative}`;
        });
};