import React from "react";

import { PlanetType } from "@entities/galaxy/model/types";

import "./orbit.scss";

interface IOrbitProps {
  listPlanet: Array<PlanetType>;
  orbitWidth: number;
  orbitHeight: number;
  planetStyle?: React.CSSProperties;
  colorId: number;
  showChildren: (childList: string | null, currentTarget: HTMLDivElement) => void,
  showParents: (parentList: string | null) => void,
  hideChildren: (childList: string | null) => void,
  hideParents: (parentList: string | null) => void,
  deleteAllConnectionLines: () => void,
}

const Orbit: React.FC<IOrbitProps> = (props) => {
  const { listPlanet, orbitWidth, orbitHeight, planetStyle, colorId, showChildren, showParents, hideParents, hideChildren, deleteAllConnectionLines } = props;

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

  const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.setAttribute('data-is-active', '1');
    const childList = event.currentTarget.getAttribute("data-planet-child-list");
    const parentList = event.currentTarget.getAttribute("data-planet-parent-list");
    console.log("childList: ", childList)
    console.log("parentList: ", parentList)

    showChildren(childList, event.currentTarget);
    showParents(parentList);
  }

  const handlePlanetMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.setAttribute('data-is-active', '0');
    const childList = event.currentTarget.getAttribute("data-planet-child-list");
    const parentList = event.currentTarget.getAttribute("data-planet-parent-list");

    hideChildren(childList);
    hideParents(parentList);
    deleteAllConnectionLines();
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
        {listPlanet.map((planet, index) => {
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
              data-planet-parent-list={planet.systemParentList.map(item => {return `${item.parent_id}-${item.isAlternative}`})}
              data-planet-child-list={planet.systemChildList}
              data-is-active="0"
            >
              <div>{planet.systemId}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orbit;
