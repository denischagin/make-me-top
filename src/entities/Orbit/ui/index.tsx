import React from "react";

import { ReactComponent as LockIcon } from "@shared/images/lock.svg";

import {SystemType} from "@entities/Galaxy/model/types";
import {Star} from "@shared/Star";

import {getDigitalAngle} from "@entities/Orbit/lib/getDigitalAngle";
import {getRadius} from "@entities/Orbit/lib/getRadius";
import {getXCoordinateOnEllipse} from "@entities/Orbit/lib/getXCoordinateOnEllipse";
import {getYCoordinateOnEllipse} from "@entities/Orbit/lib/getYCoordinateOnEllipse";
import {getPlanetParentData} from "@entities/Orbit/lib/getPlanetParentData";
import {getPlanetChildData} from "@entities/Orbit/lib/getPlanetChildData";
import {getPlanetProgress} from "@entities/Orbit/lib/getPlanetProgress";
import {getPlanetColorByProgress} from "@entities/Orbit/lib/getPlanetColorByProgress";
import {getPercentageProgress} from "@entities/Orbit/lib/getPercentageProgress";

import "./styles.scss";

import {UserProgress} from "@entities/user/model/types";


interface IOrbitProps {
  userProgress: UserProgress
  systemList: Array<SystemType>;
  orbitWidth: number;
  orbitHeight: number;
  planetStyle?: React.CSSProperties;
  handlePlanetMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void,
  handlePlanetMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Orbit: React.FC<IOrbitProps> = (props) => {
  const {
    userProgress,
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
        {
          systemList.map((planet) => {
          const planetProgress = getPlanetProgress({
            planet,
            userProgress
          });

          const planetColor = getPlanetColorByProgress({
            planetProgress,
          });

          const planetPercentageProgress = getPercentageProgress({
            planet,
            userProgress
          })

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
              data-planet-progress={planetProgress}
              data-is-active="0"
            >
              <Star
                  percentageProgress={planetPercentageProgress}
                  color={planetColor}
              >
                {
                  planetProgress === "systemClose" ?
                      <div className="orbit__content_lock-icon">
                        <LockIcon/>
                      </div>
                      : null
                }
                <p className="orbit__content_planet-name">
                  {planet.systemName}
                </p>
              </Star>
            </div>
          );
        })
        }
      </div>
    </div>
  );
}

export default Orbit;
