import React from "react";

import {SystemType, SystemDependencyType} from "@entities/galaxy/model/types";
import { Star } from "@shared/Star";

import "./orbit.scss";

interface IOrbitProps {
  systemList: Array<SystemType>;
  orbitWidth: number;
  orbitHeight: number;
  planetStyle?: React.CSSProperties;
  colorId: number;
  handlePlanetMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void,
  handlePlanetMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Orbit: React.FC<IOrbitProps> = (props) => {
  const { systemList, orbitWidth, orbitHeight, planetStyle, colorId, handlePlanetMouseEnter, handlePlanetMouseLeave } = props;

  const color = (id: number) => {
    switch (id) {
      case 1:
        return "#000000";
      case 2:
        return "red";
      case 3:
        return "green";
      case 4:
        return "#7F00FF";
    }
  };

  const orbitHalfWidth = orbitWidth / 2;
  const orbitHalfHeight = orbitHeight / 2;

  const defaultElementWidth = 80;
  const defaultElementHeight = 80;

  const getElementIfChildDependency = (element: SystemDependencyType) => {
    return element.type === "child";
  }

  const getElementIfParentDependency = (element: SystemDependencyType) => {
    return element.type === "parent";
  }



  return (
    <div className="orbit">
      <div
        className="orbit__content"
        style={{
          width: orbitWidth + "px",
          height: orbitHeight + "px",
        }}
      >
        {systemList.map((planet, index) => {
          const digitalAngle =
            ((2 * Math.PI) / 360) * planet.positionSystem + Math.PI / 2;
          const radius =
            (orbitHalfWidth * orbitHalfHeight) /
            Math.sqrt(
              orbitHalfWidth *
                orbitHalfWidth *
                Math.sin(digitalAngle) *
                Math.sin(digitalAngle) +
                orbitHalfHeight *
                  orbitHalfHeight *
                  Math.cos(digitalAngle) *
                  Math.cos(digitalAngle)
            );

          const x = Math.round(
            orbitHalfWidth -
              radius * Math.cos(digitalAngle) -
              defaultElementWidth / 2
          );
          const y = Math.round(
            orbitHalfHeight -
              radius * Math.sin(digitalAngle) -
              defaultElementHeight / 2
          );
          return (
            <div
              key={planet.systemId}
              className="orbit__content_planet"
              onMouseEnter={handlePlanetMouseEnter}
              onMouseLeave={handlePlanetMouseLeave}
              style={{
                background: color(colorId),
                zIndex: "1",
                ...planetStyle,
                left: x + "px",
                top: y + "px",
              }}
              data-planet-id={planet.systemId}
              data-planet-parent-list={planet.systemDependencyList.filter(getElementIfParentDependency).map(item => {
                return `${item.planetId}:${item.isAlternative}`;
              })}
              data-planet-child-list={planet.systemDependencyList.filter(getElementIfChildDependency).map(item => {
                return `${item.planetId}:${item.isAlternative}`;
              })}
              data-is-active="0"
            >
              <Star
                  color={"white"}
                  children={(<div>
                        {planet.systemName}
                      </div>
                  )}
              />
            </div>
          );
        })
        }
      </div>
    </div>
  );
};

export default Orbit;
