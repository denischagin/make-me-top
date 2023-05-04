import React, { createRef, useEffect, useState } from "react";

import Orbit from "../../orbit/ui/orbit";

import {getElemCoords} from "@entities/galaxy/lib/getElemCoords";
import {deleteAllConnectionLines} from "@entities/galaxy/lib/deleteAllConnecctionLines";
import {showPlanetsChildren} from "@entities/galaxy/lib/showPlanetsChildren";
import {hidePlanetsChildren} from "@entities/galaxy/lib/hidePlanetsChildren";
import {showPlanetsParents} from "@entities/galaxy/lib/showPlanetsParents";
import {hidePlanetsParents} from "@entities/galaxy/lib/hidePlanetsParents";

import { OrbitType } from "@entities/galaxy/model/types";
import "@app/styles/variables.scss";
import "./styles.scss";


interface IGalaxyProps {
  orbitList: Array<OrbitType>;
  width: number;
  height: number;
  planetWidth: number,
  planetHeight: number,
}

interface IGalaxyOrbitSettings {
  width: number,
  height: number,
  orbitWidthStep: number,
  orbitHeightStep: number,
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

  const [viewBoxOffsetX, setViewBoxOffsetX] = useState<number|undefined>();
  const [viewBoxOffsetY, setViewBoxOffsetY] = useState<number|undefined>();

  const galaxyOrbitSettings: IGalaxyOrbitSettings = {
    width: width,
    height: height,
    orbitWidthStep: width / (orbitList.length + 1),
    orbitHeightStep: height / (orbitList.length + 1),
    viewBox: `0 0 ${width} ${height}`,
  };

  useEffect(() => {
    setViewBoxOffsetX(getElemCoords({
      elem: svgContainerRef.current,
      type: "SVGSVGElement",
      planetWidth,
      planetHeight
    })?.left);

    setViewBoxOffsetY(getElemCoords({
      elem: svgContainerRef.current,
      type: "SVGSVGElement",
      planetWidth,
      planetHeight
    })?.top);

  }, []);

  const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = event.currentTarget;

    const childrenList = currentTarget.getAttribute("data-planet-children-list");
    const parentsList = currentTarget.getAttribute("data-planet-parent-list");

    currentTarget.setAttribute('data-is-active', '1');

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

    const childrenList = event.currentTarget.getAttribute("data-planet-children-list");
    const parentsList = event.currentTarget.getAttribute("data-planet-parent-list");

    currentTarget.setAttribute('data-is-active', '0');

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
            galaxyOrbitSettings.width -= galaxyOrbitSettings.orbitWidthStep;
            galaxyOrbitSettings.height -= galaxyOrbitSettings.orbitHeightStep;

            return (
                <Orbit
                    key={orbits.orbitId}
                    systemList={orbits.systemList}
                    orbitWidth={galaxyOrbitSettings.width}
                    orbitHeight={galaxyOrbitSettings.height}
                    planetStyle={{
                      color: "white",
                      width: planetWidth + "px",
                      height: planetHeight + "px",
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