import React from "react";

import "./orbit.scss";

interface IOrbitProps {
  listPlanet: Array<{
    systemId: number;
    positionSystem: number;
    systemName: string;
    systemLevel: number;
    systemParentList: Array<{
      parent_id: number | null;
      isAlternative: boolean;
    }>;
    systemChildList: Array<number>;
  }>;
  orbitWidth: number;
  orbitHeight: number;
  planetStyle?: React.CSSProperties;
  elementsCountStep?: number;
  angleStep?: number;
  shift?: number;
}

const Orbit: React.FC<IOrbitProps> = (props) => {
  const {
    listPlanet,
    orbitWidth,
    orbitHeight,
    planetStyle,
    elementsCountStep,
    angleStep,
    shift,
  } = props;

  const orbitHalfWidth = orbitWidth / 2;
  const orbitHalfHeight = orbitHeight / 2;

  const defaultElementWidth = 20;
  const defaultElementHeight = 20;
  const defaultBackground = "#f00";
  let orbitStep = 0;

  const orbitElementsCount = elementsCountStep || listPlanet.length;

  // можно задавать начальное значение для смещения элементов на орбите (половина орбиты это 3.14)
  let angle = shift || Math.PI / orbitElementsCount;

  // можно задать кол-во элементов на орбите, 20шт -> (2 * Math.PI) / 20
  // можно задать расстояние между элементами? в градусах, 15гр ->(2 * Math.PI) / (320 / 15)
  if (angleStep) {
    orbitStep = (2 * Math.PI) / (320 / angleStep);
  } else {
    orbitStep = (2 * Math.PI) / orbitElementsCount;
  }

  return (
    <div
      className="orbit"
      style={{
        width: orbitWidth + "px",
        height: orbitHeight + "px",
      }}
    >
      {listPlanet.map((planet, index) => {
        const radius =
          (orbitHalfWidth * orbitHalfHeight) /
          Math.sqrt(
            orbitHalfWidth *
              orbitHalfWidth *
              Math.sin(angle) *
              Math.sin(angle) +
              orbitHalfHeight *
                orbitHalfHeight *
                Math.cos(angle) *
                Math.cos(angle)
          );
        const x = Math.round(
          orbitWidth / 2 + radius * Math.cos(angle) - defaultElementWidth / 2
        );
        const y = Math.round(
          orbitHeight / 2 + radius * Math.sin(angle) - defaultElementHeight / 2
        );

        angle += orbitStep;

        return (
          <div
            key={planet.systemId}
            className="planet"
            style={{
              background: defaultBackground,
              ...planetStyle,
              left: x + "px",
              top: y + "px",
            }}
          >
            <div>{planet.systemName}</div>
          </div>
        );
      })}
    </div>
  );
};

export default Orbit;
