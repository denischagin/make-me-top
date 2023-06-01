import React from "react";

interface IAddActivePlanet {
  activePlanetId: number | string | null;
  setActivePlanets: React.Dispatch<React.SetStateAction<Array<number>>>;
}

export const addActivePlanet = (params: IAddActivePlanet) => {
  const { setActivePlanets } = params;

  const activePlanet = Number(params.activePlanetId);

  if (params.activePlanetId === null) {
    return;
  }

  setActivePlanets((prevState) => {
    if (prevState.includes(activePlanet)) {
      return [...prevState];
    }

    return [...prevState, activePlanet].sort((a, b) => a - b);
  });
};
