import React from 'react';

interface IAddActivePlanet {
  activeSystemId: number | string | null;
  setActiveSystemsIds: React.Dispatch<React.SetStateAction<Array<number>>>;
}


//функция добавления id системы в массив, описывающий активные элементы галактики
export const addActiveSystem = (params: IAddActivePlanet) => {
    const {
        activeSystemId,
        setActiveSystemsIds,
    } = params;

    const activeSystem = Number(activeSystemId);

    if (!activeSystemId) {
        return;
    }

    setActiveSystemsIds((prevState) => {
    //ничего не изменяем, если в состоянии уже есть такой же id
        if (prevState.includes(activeSystem)) {
            return prevState;
        }

        //добавление id с сортировкой по нарастанию значений
        return [...prevState, activeSystem].sort((a, b) => a - b);
    });
};
