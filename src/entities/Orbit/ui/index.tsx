import React from "react";

import {SystemType} from "@entities/Galaxy/model/types";
import {Star} from "@shared/Star";

import {getDigitalAngle} from "@entities/Orbit/lib/getDigitalAngle";
import {getRadius} from "@entities/Orbit/lib/getRadius";
import {getXCoordinateOnEllipse} from "@entities/Orbit/lib/getXCoordinateOnEllipse";
import {getYCoordinateOnEllipse} from "@entities/Orbit/lib/getYCoordinateOnEllipse";
import {getPlanetParentData} from "@entities/Orbit/lib/getPlanetParentData";
import {getPlanetChildData} from "@entities/Orbit/lib/getPlanetChildData";

import "@entities/Orbit/ui/styles.scss";
import {starColor} from "@shared/Star/interfaces";


interface IOrbitProps {
  systemList: Array<SystemType>;
  orbitWidth: number;
  orbitHeight: number;
  planetStyle?: React.CSSProperties;
  handlePlanetMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void,
  handlePlanetMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Orbit: React.FC<IOrbitProps> = (props) => {
  const {
    systemList,
    orbitWidth,
    orbitHeight,
    planetStyle,
    handlePlanetMouseEnter,
    handlePlanetMouseLeave
  } = props;

  const orbitHalfWidth = orbitWidth / 2;
  const orbitHalfHeight = orbitHeight / 2;

  const defaultElementWidth = 80;
  const defaultElementHeight = 80;

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
          const digitalAngle = getDigitalAngle(planet.positionSystem);

          const radius = getRadius({
            digitalAngle,
            halfWidth: orbitHalfWidth,
            halfHeight: orbitHalfHeight});

          const x = getXCoordinateOnEllipse({
            ellipseHalfWidth: orbitHalfWidth,
            radius,
            digitalAngle,
            elementWidth: defaultElementWidth});

          const y = getYCoordinateOnEllipse({
            ellipseHalfHeight: orbitHalfHeight,
            radius,
            digitalAngle,
            elementHeight: defaultElementHeight});

          return (
            <div
              key={planet.systemId}
              className="orbit__content_planet"
              onMouseEnter={handlePlanetMouseEnter}
              onMouseLeave={handlePlanetMouseLeave}
              style={{
                ...planetStyle,
                left: x + "px",
                top: y + "px",
              }}
              data-planet-id={planet.systemId}
              data-planet-parent-list={getPlanetParentData(planet)}
              data-planet-children-list={getPlanetChildData(planet)}
              data-is-active="0"
            >
              <Star
                  color={starColor.white}
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
