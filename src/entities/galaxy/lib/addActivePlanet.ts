import React from 'react';

interface IAddActivePlanet {
  activeSystemId: number | string | null;
  setActiveSystems: React.Dispatch<React.SetStateAction<Array<number>>>;
}


//функция добавления числа в массив, являющийся состоянием компонента
export const addActivePlanet = (params: IAddActivePlanet) => {
    const {
        activeSystemId,
        setActiveSystems,
    } = params;

    const activeSystem = Number(activeSystemId);

    if (activeSystemId === null) {
        return;
    }

    setActiveSystems((prevState) => {
    //ничего не изменяем, если в состоянии уже есть такой же id
        if (prevState.includes(activeSystem)) {
            return prevState;
        }

        //добавление id с сортировкой по нарастанию значений
        return [...prevState, activeSystem].sort((a, b) => a - b);
    });
};
