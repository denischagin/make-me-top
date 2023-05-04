import React, { createRef, useEffect, useState } from "react";
import { OrbitType } from "@entities/galaxy/model/types";
import Orbit from "../../orbit/ui/orbit";
import { getElemCoords } from "@entities/galaxy/lib/getElemCoords";
import {deleteAllConnectionLines} from "@entities/galaxy/lib/deleteAllConnecctionLines";
import {connectionsOverlapCheck} from "@entities/galaxy/lib/connectionsOverlapCheck";
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

interface IGetCoordsForConnectionProps {
  currentTarget: {
    top: number,
    left: number
  },
  elementToConnect: {
    top: number,
    left: number
  },
  swingCountProp?: number
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

  const colorModificationArray: Array<string> = ["blue-stroke-color", "orange-stroke-color"];
  let colorShelf: Array<string> = colorModificationArray.slice();

  const restoreColorShelf = (): void => {
    colorShelf = colorModificationArray.slice();
  }
  const getColorFromShelf = (): string => {
    let colorModification = colorShelf.shift();

    if (colorModification === undefined) {
      colorModification = "white-stroke-color";
    }

    return colorModification;
  }

  useEffect(() => {
    setViewBoxOffsetX(getElemCoords({
      elem: svgContainerRef.current,
      type: "SVGSVGElement",
      planetWidth,
      planetHeight
    })?.left)

    setViewBoxOffsetY(getElemCoords({
      elem: svgContainerRef.current,
      type: "SVGSVGElement",
      planetWidth,
      planetHeight
    })?.top)

  }, [])

  const getCoordsForConnection = (props: IGetCoordsForConnectionProps): IGetCoordsForConnectionProps => {
    const {
      currentTarget,
      elementToConnect,
      swingCountProp
    } = props

    let swingCount = swingCountProp || 1;
    const step = 7;
    let swingDirection = 0;
    const offset = step * swingCount;
    const isOverlapped = connectionsOverlapCheck({
      currentTargetCoords: currentTarget,
      elementToConnectCoords: elementToConnect,
      viewBoxOffsetY,
      viewBoxOffsetX,
      svgContainer: svgContainerRef.current
    });

    if (swingCount % 2 === 0) {
      swingDirection = -1;
    }
    else {
      swingDirection = 1;
    }

    if (isOverlapped) {

      return getCoordsForConnection({
        currentTarget: {
          top: currentTarget.top + offset * swingDirection,
          left: currentTarget.left + offset * swingDirection
        },
        elementToConnect: {
          top: elementToConnect.top + offset * swingDirection,
          left: elementToConnect.left + offset * swingDirection,
        },
        swingCountProp: ++swingCount,
      });
    }

    return {
      currentTarget: currentTarget,
      elementToConnect: elementToConnect,
      swingCountProp: swingCount,
    }
  }

  const showChildren = (childList: string | null, currentTarget: HTMLDivElement) => {
    const currentTargetCoords = getElemCoords({
      elem: currentTarget,
      type: "HTMLElement",
      planetWidth,
      planetHeight
    });
    const childListArray = childList!.split(",");

    childListArray.forEach(elementData => {
      const elementDataArray = elementData.split(":");
      const numberElementId = parseInt(elementDataArray[0], 10);
      const isAlternative = elementDataArray[1] === "true" ? 1 : 0;

      if (isNaN(numberElementId)) {
        return
      }

      const childElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);

      const childElementCoords = getElemCoords({
        elem: childElement,
        type: "HTMLElement",
        planetWidth,
        planetHeight
      });

      const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

      childElement?.setAttribute("data-is-active", "1");

      if (currentTargetCoords && childElementCoords && (viewBoxOffsetX !== undefined) && (viewBoxOffsetY !== undefined)) {
        svgLine.setAttribute('class', 'connection-line');
        svgLine.setAttribute('x1', String(currentTargetCoords?.left - viewBoxOffsetX));
        svgLine.setAttribute('y1', String(currentTargetCoords?.top - viewBoxOffsetY));
        svgLine.setAttribute('x2', String(childElementCoords?.left - viewBoxOffsetX));
        svgLine.setAttribute('y2', String(childElementCoords?.top - viewBoxOffsetY));
        svgLine.setAttribute('stroke', "white");
      }

      if (isAlternative) {
        svgLine.setAttribute('stroke-dasharray', "10 5");
      }

      svgContainerRef.current?.append(svgLine);
    })
  }

  const hideChildren = (childList: string | null) => {
    const childListNumbersArray = childList!.split(",");

    childListNumbersArray.forEach(elementId => {
      if (elementId === '') {
        return;
      }

      const numberElementId = parseInt(elementId, 10);
      const childElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);
      childElement?.setAttribute("data-is-active", "0");
    })
  }

  const showParents = (parentList: string | null, currentTarget: HTMLDivElement, color: string | null) => {
    const currentTargetCoords = getElemCoords({
      elem: currentTarget,
      type: "HTMLElement",
      planetWidth,
      planetHeight
    });
    const parentsListArray = parentList!.split(",");

    parentsListArray.forEach(elementData => {
      const elementDataArray = elementData.split(":");
      const numberElementId = parseInt(elementDataArray[0], 10);

      if (isNaN(numberElementId)) {
        return
      }

      const isAlternative = elementDataArray[1] === "true" ? 1 : 0;
      const parentElement = document.querySelector<HTMLDivElement>(`[data-planet-id="${numberElementId}"]`);
      const parentElementCoords = getElemCoords({
        elem: parentElement,
        type: "HTMLElement",
        planetWidth,
        planetHeight
      });
      const parentList = parentElement!.getAttribute("data-planet-parent-list");
      const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

      parentElement?.setAttribute("data-is-active", "1");

      if (currentTargetCoords && parentElementCoords && (viewBoxOffsetX !== undefined) && (viewBoxOffsetY !== undefined)) {
        const lineCoordsWithoutOverlaps = getCoordsForConnection({
          currentTarget: currentTargetCoords,
          elementToConnect: parentElementCoords
        })

        svgLine.setAttribute('x1', String(lineCoordsWithoutOverlaps!.currentTarget.left - viewBoxOffsetX));
        svgLine.setAttribute('y1', String(lineCoordsWithoutOverlaps!.currentTarget.top - viewBoxOffsetY));
        svgLine.setAttribute('x2', String(lineCoordsWithoutOverlaps!.elementToConnect.left - viewBoxOffsetX));
        svgLine.setAttribute('y2', String(lineCoordsWithoutOverlaps!.elementToConnect.top - viewBoxOffsetY));

        svgLine.setAttribute('class', 'connection-line');
        svgLine.setAttribute('stroke', "white");
      }

      if (isAlternative) {
        svgLine.setAttribute('stroke-dasharray', "10 5");
        color = getColorFromShelf();
      }

      if (color) {
        svgLine.setAttribute('class', svgLine!.getAttribute("class")+ " " + color);
      }

      svgContainerRef.current?.append(svgLine);

      if (parentElement && parentList) {
        showParents(parentList, parentElement, color);
      }
    })
  }

  const hideParents = (parentList: string | null) => {
    const parentsListArray = parentList!.split(",");

    parentsListArray.forEach(elementData => {
      const elementDataArray = elementData.split(":");
      const numberElementId = parseInt(elementDataArray[0], 10);

      if (isNaN(numberElementId)) {
        return
      }

      const parentElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);
      const parentList = parentElement!.getAttribute("data-planet-parent-list");

      parentElement?.setAttribute("data-is-active", "0");

      if (parentList) {
        hideParents(parentList);
      }
    })
  }

  const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const childList = event.currentTarget.getAttribute("data-planet-child-list");
    const parentList = event.currentTarget.getAttribute("data-planet-parent-list");

    event.currentTarget.setAttribute('data-is-active', '1');

    showChildren(childList, event.currentTarget);
    showParents(parentList, event.currentTarget, null);
  }

  const handlePlanetMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    event.currentTarget.setAttribute('data-is-active', '0');
    const childList = event.currentTarget.getAttribute("data-planet-child-list");
    const parentList = event.currentTarget.getAttribute("data-planet-parent-list");

    hideChildren(childList);
    hideParents(parentList);
    deleteAllConnectionLines(svgContainerRef.current);
    restoreColorShelf();
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