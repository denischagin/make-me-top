import React, {createRef, useEffect, useState} from "react";

import Orbit from "@entities/orbit/ui";

import {getElemCoords} from "@entities/galaxy/lib/getElemCoords";
import {deleteAllConnectionLines} from "@entities/galaxy/lib/deleteAllConnectionLines";
import {hidePlanetsChildren} from "@entities/galaxy/lib/hidePlanetsChildren";
import {hidePlanetsParents} from "@entities/galaxy/lib/hidePlanetsParents";
import {showPlanetsParents} from "@entities/galaxy/lib/showPlanetsParents";
import {showPlanetsChildren} from "@entities/galaxy/lib/showPlanetsChildren";

import { OrbitType } from "@entities/galaxy/model/types";
import "./style.scss";
import {ACTIVE_PLANET, INACTIVE_PLANET, SVG_ELEMENT} from "@entities/galaxy/model/constants";

interface IGalaxyProps {
  orbitList: Array<OrbitType>;
  width: number;
  height: number;
  planetWidth: number,
  planetHeight: number,
}

interface IGalaxyOrbitSettings {
  width: number,
  backgroundWidth: number,
  height: number,
  backgroundHeight:number,
  viewBox: string,
}

const Galaxy: React.FC<IGalaxyProps> = (props) => {
  const {
    orbitList,
    width,
    height,
    planetWidth,
    planetHeight
  } = props;

  const svgContainerRef = createRef<SVGSVGElement>();

  const [viewBoxOffsetX, setViewBoxOffsetX] = useState<number>(0);
  const [viewBoxOffsetY, setViewBoxOffsetY] = useState<number>(0);

  const orbitWidthStep = width / (orbitList.length + 1);
  const orbitHeightStep = height / (orbitList.length + 1);

  const galaxyOrbitSettings: IGalaxyOrbitSettings = {
    width: width,
    backgroundWidth: width + (orbitWidthStep / 2),
    height: height,
    backgroundHeight: height + (orbitHeightStep / 2),
    viewBox: `0 0 ${width} ${height}`,
  };


  useEffect(() => {
    setViewBoxOffsetX(getElemCoords({
      elem: svgContainerRef.current,
      type: SVG_ELEMENT,
    })!.left);

    setViewBoxOffsetY(getElemCoords({
      elem: svgContainerRef.current,
      type: SVG_ELEMENT,
    })!.top);
  }, []);

  const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const childrenList = currentTarget.getAttribute("data-planet-children-list");
    const parentsList = currentTarget.getAttribute("data-planet-parent-list")

    event.currentTarget.setAttribute('data-is-active', ACTIVE_PLANET);

    showPlanetsChildren({
      childrenList,
      currentTarget,
      planetWidth,
      planetHeight,
      viewBoxOffsetX,
      viewBoxOffsetY,
      svgContainer: svgContainerRef.current
    });

    showPlanetsParents({
      parentsList,
      currentTarget,
      planetWidth,
      planetHeight,
      viewBoxOffsetX,
      viewBoxOffsetY,
      svgContainer: svgContainerRef.current
    });
  }

  const handlePlanetMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const childrenList = currentTarget.getAttribute("data-planet-children-list");
    const parentsList = currentTarget.getAttribute("data-planet-parent-list");

    event.currentTarget.setAttribute('data-is-active', INACTIVE_PLANET);

    hidePlanetsChildren({
      childrenList,
    });

    hidePlanetsParents({
      parentsList,
    });

    deleteAllConnectionLines({
      svgContainer: svgContainerRef.current,
    });
  }

  return (
      <div
          className="galaxy"
          style={{
            width,
            height,
          }}
      >
        <div
            className="galaxy__background"
            style={{
              width: galaxyOrbitSettings.width,
              height: galaxyOrbitSettings.height,
            }}
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="galaxy__svg-container"
            viewBox={galaxyOrbitSettings.viewBox}
            width={width}
            height={height}
            ref={svgContainerRef}
        />
        {
          orbitList.map((orbits) => {
            galaxyOrbitSettings.width -= orbitWidthStep
            galaxyOrbitSettings.height -= orbitHeightStep;

            return (
                <Orbit
                    key={orbits.orbitId}
                    systemList={orbits.systemList}
                    orbitWidth={galaxyOrbitSettings.width}
                    orbitHeight={galaxyOrbitSettings.height}
                    planetStyle={{
                      color: "white",
                      width: planetWidth + "px",
                      height: planetHeight + "px"
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