import React, {createRef, useEffect, useState} from "react";

import Orbit from "@entities/Orbit/ui";

import {getElemCoords} from "@entities/Galaxy/lib/getElemCoords";
import {deleteAllConnectionLines} from "@entities/Galaxy/lib/deleteAllConnectionLines";
import {hidePlanetsChildren} from "@entities/Galaxy/lib/hidePlanetsChildren";
import {hidePlanetsParents} from "@entities/Galaxy/lib/hidePlanetsParents";
import {showPlanetsParents} from "@entities/Galaxy/lib/showPlanetsParents";
import {showPlanetsChildren} from "@entities/Galaxy/lib/showPlanetsChildren";

import { OrbitType } from "@entities/Galaxy/model/types";
import "./style.scss";
import {BackgroundProfile} from "@shared/BackgroundProfile";

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
      type: "SVGSVGElement",
    })!.left);

    setViewBoxOffsetY(getElemCoords({
      elem: svgContainerRef.current,
      type: "SVGSVGElement",
    })!.top);

  }, []);

  const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const childrenList = currentTarget.getAttribute("data-planet-children-list");
    const parentsList = currentTarget.getAttribute("data-planet-parent-list")

    event.currentTarget.setAttribute('data-is-active', '1');

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

    event.currentTarget.setAttribute('data-is-active', '0');

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
            galaxyOrbitSettings.width -= orbitWidthStep;
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