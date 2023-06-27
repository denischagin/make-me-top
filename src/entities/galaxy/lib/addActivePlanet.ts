import React from "react";

interface IAddActivePlanet {
  activePlanetId: number | string | null;
  setActivePlanets: React.Dispatch<React.SetStateAction<Array<number>>>;
}


//функция добавления числа в массив, являющийся состоянием компонента
export const addActivePlanet = (params: IAddActivePlanet) => {
  const {
    activePlanetId,
    setActivePlanets,
  } = params;

  const activePlanet = Number(activePlanetId);

  if (activePlanetId === null) {
    return;
  }

  setActivePlanets((prevState) => {
    //ничего не изменяем, если в состоянии уже есть такой же id
    if (prevState.includes(activePlanet)) {
      return prevState;
    }

    //добавление id с сортировкой по наростанию значений
    return [...prevState, activePlanet].sort((a, b) => a - b);
  });
};
