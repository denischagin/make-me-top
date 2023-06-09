import React, { createRef, useEffect, useState } from "react";

import { PlanetProgressTypes } from "@shared/types/common";
import { bem } from "@shared/utils/bem";

import { addActivePlanet } from "@entities/Galaxy/lib/addActivePlanet";
import { createSvgContainer } from "@entities/Galaxy/lib/createSvgContainer";
import { deleteAllConnectionLines } from "@entities/Galaxy/lib/deleteAllConnectionLines";
import { hidePlanetsChildren } from "@entities/Galaxy/lib/hidePlanetsChildren";
import { hidePlanetsParents } from "@entities/Galaxy/lib/hidePlanetsParents";
import { showPlanetsChildren } from "@entities/Galaxy/lib/showPlanetsChildren";
import { showPlanetsParents } from "@entities/Galaxy/lib/showPlanetsParents";
import { OrbitType } from "@entities/Galaxy/model/types";
import {
  DATA_PLANET_CHILDREN_LIST,
  DATA_PLANET_ID,
  DATA_PLANET_PARENT_LIST,
  DATA_PLANET_PROGRESS_TYPE,
} from "@entities/Orbit/model/types";
import Orbit from "@entities/Orbit/ui";
import { UserProgress } from "@entities/user/model/types";

import "./style.scss";

interface IGalaxyProps {
  galaxyPage: HTMLDivElement | null;
  userProgress: UserProgress;
  orbitList: Array<OrbitType>;
  svgContainerClass: string;
  width?: number;
  height?: number;
  planetWidth?: number;
  planetHeight?: number;
}

interface IGalaxyOrbitSettings {
  width: number;
  planetWidth: number;
  backgroundWidth: number;
  height: number;
  planetHeight: number;
  backgroundHeight: number;
}

const Galaxy: React.FC<IGalaxyProps> = (props) => {
  const { svgContainerClass, galaxyPage, userProgress, orbitList } = props;

  const [svgContainer, setSvgContainer] = useState<SVGElement | null>(null);
  const [activePlanetsId, setActivePlanetsId] = useState<Array<number>>([]);
  const [planetsChild, setPlanetsChild] = useState<NodeListOf<HTMLDivElement>>(
    document.querySelectorAll(
      ".star__orbit.star__orbit--activity-inactive"
    )
  );

  const width = props.width || 1920; // TODO деф присваивание
  const height = props.height || 910;

  const orbitWidthStep = width / (orbitList.length + 1);
  const orbitHeightStep = height / (orbitList.length + 1);

  const galaxyOrbitSettings: IGalaxyOrbitSettings = {
    width,
    planetWidth: props.planetWidth || 80,
    backgroundWidth: width + orbitWidthStep / 2,
    height,
    planetHeight: props.planetWidth || 80,
    backgroundHeight: height + orbitHeightStep / 2,
  };

  useEffect(() => {
    setSvgContainer(
      createSvgContainer({
        galaxyPage,
        svgContainerClass,
      })
    );
  }, [galaxyPage]);

  useEffect(() => {
    setPlanetsChild(
      document.querySelectorAll(
        ".star__orbit.star__orbit--activity-inactive , .star__orbit.star__orbit--activity-active"
      )
    );
  }, [activePlanetsId]);

  useEffect(() => {
    planetsChild.forEach((planet) => {
      if (activePlanetsId.length === 0) {
        planet.setAttribute(
          "class",
          "star__orbit star__orbit--activity-inactive"
        );
      } else {
        activePlanetsId.forEach((planetId) => {
          const planet = document.querySelector<HTMLElement>(
            `[${DATA_PLANET_ID}="${planetId}"]`
          );

          if (planet === null) {
            return;
          }

          const planetChild = planet.querySelector(".star__orbit");

          if (planetChild === null) {
            return;
          }

          planetChild.setAttribute(
            "class",
            "star__orbit star__orbit--activity-active"
          );
        });
      }
    });
  }, [planetsChild, activePlanetsId]);

  const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const targetId = currentTarget.getAttribute(DATA_PLANET_ID);
    const childrenList = currentTarget.getAttribute(DATA_PLANET_CHILDREN_LIST);
    const parentsList = currentTarget.getAttribute(DATA_PLANET_PARENT_LIST);
    const planetProgressType = currentTarget.getAttribute(
      DATA_PLANET_PROGRESS_TYPE
    );

    console.log(true);

    addActivePlanet({
      activePlanetId: targetId,
      setActivePlanets: setActivePlanetsId,
    });

    if (
      planetProgressType === PlanetProgressTypes.SYSTEM_OPEN ||
      planetProgressType === PlanetProgressTypes.SYSTEM_EDUCATION
    ) {
      showPlanetsChildren({
        childrenList,
        currentTarget,
        planetWidth: galaxyOrbitSettings.planetWidth,
        planetHeight: galaxyOrbitSettings.planetHeight,
        svgContainer,
        setActivePlanets: setActivePlanetsId,
      });
    }

    if (planetProgressType === PlanetProgressTypes.SYSTEM_CLOSE) {
      showPlanetsParents({
        parentsList,
        currentTarget,
        planetWidth: galaxyOrbitSettings.planetWidth,
        planetHeight: galaxyOrbitSettings.planetHeight,
        svgContainer,
        setActivePlanets: setActivePlanetsId,
      });
    }
  };

  const handlePlanetMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const childrenList = currentTarget.getAttribute(DATA_PLANET_CHILDREN_LIST);
    const parentsList = currentTarget.getAttribute(DATA_PLANET_PARENT_LIST);

    setActivePlanetsId([]);
    console.log(false);

    // event.currentTarget.setAttribute("data-is-active", "0");
    hidePlanetsChildren({
      childrenList,
    });

    hidePlanetsParents({
      parentsList,
    });

    deleteAllConnectionLines({
      svgContainer,
    });
  };

  return (
    <div
      id="galaxy-element"
      className="galaxy"
      style={{
        width: width,
        height: height,
      }}
    >
      <div
        className="galaxy__background"
        style={{
          width: galaxyOrbitSettings.width,
          height: galaxyOrbitSettings.height,
        }}
      />
      {orbitList.map((orbits) => {
        galaxyOrbitSettings.width -= orbitWidthStep;
        galaxyOrbitSettings.height -= orbitHeightStep;

        return (
          <Orbit
            key={orbits.orbitId}
            userProgress={userProgress}
            systemList={orbits.systemList}
            orbitWidth={galaxyOrbitSettings.width}
            orbitHeight={galaxyOrbitSettings.height}
            planetStyle={{
              width: galaxyOrbitSettings.planetWidth + "px",
              height: galaxyOrbitSettings.planetHeight + "px",
            }}
            handlePlanetMouseEnter={handlePlanetMouseEnter}
            handlePlanetMouseLeave={handlePlanetMouseLeave}
          />
        );
      })}
    </div>
  );
};

export default Galaxy;
