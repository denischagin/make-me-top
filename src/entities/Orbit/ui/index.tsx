import React from "react";

import { Star } from "@shared/Star";
import { ReactComponent as LockIcon } from "@shared/images/lock.svg";
import { PlanetProgressTypes } from "@shared/types/common";

import { SystemType } from "@entities/Galaxy/model/types";
import { getDigitalAngle } from "@entities/Orbit/lib/getDigitalAngle";
import { getPercentageProgress } from "@entities/Orbit/lib/getPercentageProgress";
import { getPlanetChildData } from "@entities/Orbit/lib/getPlanetChildData";
import { getPlanetColorByProgressType } from "@entities/Orbit/lib/getPlanetColorByProgressType";
import { getPlanetParentData } from "@entities/Orbit/lib/getPlanetParentData";
import { getPlanetProgressType } from "@entities/Orbit/lib/getPlanetProgressType";
import { getRadius } from "@entities/Orbit/lib/getRadius";
import { getXCoordinateOnEllipse } from "@entities/Orbit/lib/getXCoordinateOnEllipse";
import { getYCoordinateOnEllipse } from "@entities/Orbit/lib/getYCoordinateOnEllipse";
import { UserProgress } from "@entities/user/model/types";

import "./styles.scss";
import {showModal} from "@entities/user/model/slice";
import {useAppDispatch} from "@app/providers/store/hooks";

interface IOrbitProps {
  userProgress: UserProgress;
  systemList: Array<SystemType>;
  orbitWidth: number;
  orbitHeight: number;
  planetStyle?: React.CSSProperties;
  handlePlanetClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  handlePlanetMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
  handlePlanetMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const Orbit: React.FC<IOrbitProps> = (props) => {
  const {
    userProgress,
    systemList,
    orbitWidth,
    orbitHeight,
    planetStyle,
    handlePlanetClick,
    handlePlanetMouseEnter,
    handlePlanetMouseLeave,
  } = props;

  const dispatch = useAppDispatch();

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
        {systemList.map((planet) => {
          const planetProgressType = getPlanetProgressType({
            planet,
            userProgress,
          });

          const planetColor = getPlanetColorByProgressType({
            planetProgressType,
          });

          const planetPercentageProgress = getPercentageProgress({
            planet,
            userProgress,
          });

          const digitalAngle = getDigitalAngle(planet.positionSystem);

          const radius = getRadius({
            digitalAngle,
            halfWidth: orbitHalfWidth,
            halfHeight: orbitHalfHeight,
          });

          const x = getXCoordinateOnEllipse({
            ellipseHalfWidth: orbitHalfWidth,
            radius,
            digitalAngle,
            elementWidth: defaultElementWidth,
          });

          const y = getYCoordinateOnEllipse({
            ellipseHalfHeight: orbitHalfHeight,
            radius,
            digitalAngle,
            elementHeight: defaultElementHeight,
          });

          return (
            <div
              key={planet.systemId}
              className="orbit__content_planet"
              onClick={(event) => {
                dispatch(showModal());
                handlePlanetClick(event);
              }}
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
              data-planet-progress-type={planetProgressType}
            >
              <Star
                percentageProgress={planetPercentageProgress}
                color={planetColor}
              >
                {planetProgressType === PlanetProgressTypes.SYSTEM_CLOSE && (
                  <LockIcon />
                )}
                <p className="orbit__content_planet-name">
                  {planet.systemName}
                </p>
              </Star>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orbit;
