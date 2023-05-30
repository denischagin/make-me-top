import React, {createRef, useEffect, useState} from "react";

import Orbit from "@entities/Orbit/ui";

import {createSvgContainer} from "@entities/Galaxy/lib/createSvgContainer";
import {deleteAllConnectionLines} from "@entities/Galaxy/lib/deleteAllConnectionLines";
import {hidePlanetsChildren} from "@entities/Galaxy/lib/hidePlanetsChildren";
import {hidePlanetsParents} from "@entities/Galaxy/lib/hidePlanetsParents";
import {showPlanetsParents} from "@entities/Galaxy/lib/showPlanetsParents";
import {showPlanetsChildren} from "@entities/Galaxy/lib/showPlanetsChildren";

import { OrbitType } from "@entities/Galaxy/model/types";
import {UserProgress} from "@entities/user/model/types";

import "./style.scss";



interface IGalaxyProps {
  galaxyPage: HTMLDivElement | null,
  userProgress: UserProgress,
  orbitList: Array<OrbitType>,
  svgContainerClass: string
  width?: number;
  height?: number;
  planetWidth?: number,
  planetHeight?: number,
}

interface IGalaxyOrbitSettings {
  width: number,
  planetWidth: number,
  backgroundWidth: number,
  height: number,
  planetHeight: number,
  backgroundHeight:number,
}

const Galaxy: React.FC<IGalaxyProps> = (props) => {
  const {
    svgContainerClass,
    galaxyPage,
    userProgress,
    orbitList,
  } = props;

  const [svgContainer, setSvgContainer] = useState<SVGElement | null>(null)

  const width = props.width || 1920;
  const height = props.height || 910;

  const orbitWidthStep = width / (orbitList.length + 1);
  const orbitHeightStep = height / (orbitList.length + 1);

  const galaxyOrbitSettings: IGalaxyOrbitSettings = {
    width,
    planetWidth: props.planetWidth || 80,
    backgroundWidth: width + (orbitWidthStep / 2),
    height,
    planetHeight: props.planetWidth || 80,
    backgroundHeight: height + (orbitHeightStep / 2),
  };

  useEffect(() => {
    setSvgContainer(createSvgContainer({
      galaxyPage,
      svgContainerClass,
    }));
  }, [galaxyPage])

  const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const childrenList = currentTarget.getAttribute("data-planet-children-list");
    const parentsList = currentTarget.getAttribute("data-planet-parent-list");
    const planetProgress = currentTarget.getAttribute("data-planet-progress")

    event.currentTarget.setAttribute('data-is-active', '1');

    if (planetProgress === "systemOpen" || planetProgress === "systemEducation") {
      showPlanetsChildren({
        childrenList,
        currentTarget,
        planetWidth: galaxyOrbitSettings.planetWidth,
        planetHeight: galaxyOrbitSettings.planetHeight,
        svgContainer,
      });
    }

    if (planetProgress === "systemClose") {
      showPlanetsParents({
        parentsList,
        currentTarget,
        planetWidth: galaxyOrbitSettings.planetWidth,
        planetHeight: galaxyOrbitSettings.planetHeight,
        svgContainer
      });
    }
  }

  const handlePlanetMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const childrenList = currentTarget.getAttribute("data-planet-children-list");
    const parentsList = currentTarget.getAttribute("data-planet-parent-list");

    event.currentTarget.setAttribute('data-is-active', '0');

    hidePlanetsChildren({
      childrenList,
    });

    hidePlanetsParents({
      parentsList,
    });

    deleteAllConnectionLines({
      svgContainer,
    });
  }

  return (
      <div
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
        {
          orbitList.map((orbits) => {
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
                      height: galaxyOrbitSettings.planetHeight + "px"
                    }}
                    handlePlanetMouseEnter={handlePlanetMouseEnter}
                    handlePlanetMouseLeave={handlePlanetMouseLeave}
                />
            );
          })
        }
      </div>
  );
};

export default Galaxy;