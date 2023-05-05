import React, {createRef, useEffect, useState} from "react";

import { OrbitType } from "@entities/galaxy/model/types";
import Orbit from "../../orbit/ui/orbit";
import "./style.scss";

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

  const [viewBoxOffsetX, setViewBoxOffsetX] = useState<number|undefined>();
  const [viewBoxOffsetY, setViewBoxOffsetY] = useState<number|undefined>();

  const orbitWidthStep = width / (orbitList.length + 1);
  const orbitHeightStep = height / (orbitList.length + 1);

  const galaxyOrbitSettings: IGalaxyOrbitSettings = {
    width: width,
    backgroundWidth: width + (orbitWidthStep / 2),
    height: height,
    backgroundHeight: height + (orbitHeightStep / 2),
    viewBox: `0 0 ${width} ${height}`,
  };

  function getElemCoords(elem: HTMLElement | SVGSVGElement | null, type: "HTMLElement" | "SVGSVGElement") {
    if (!elem) {
      return
    }

    const box = elem.getBoundingClientRect();

    const body = document.body;
    const docEl = document.documentElement;

    const scrollTop = window.scrollY  || docEl.scrollTop || body.scrollTop;
    const scrollLeft = window.scrollX || docEl.scrollLeft || body.scrollLeft;

    const clientTop = docEl.clientTop || body.clientTop || 0;
    const clientLeft = docEl.clientLeft || body.clientLeft || 0;

    let top = 0;
    let left = 0;

    switch (type) {
      case "HTMLElement": {
        top  = box.top +  scrollTop - clientTop + planetHeight/2;
        left = box.left + scrollLeft - clientLeft + planetWidth/2;

        break;
      }
      case "SVGSVGElement": {
        top  = box.top +  scrollTop - clientTop;
        left = box.left + scrollLeft - clientLeft;

        break;
      }
      default: break;
    }

    return { top: Math.round(top), left: Math.round(left) };
  }

  useEffect(() => {
    setViewBoxOffsetX(getElemCoords(svgContainerRef.current, "SVGSVGElement")?.left)
    setViewBoxOffsetY(getElemCoords(svgContainerRef.current, "SVGSVGElement")?.top)
  }, [])

  const deleteAllConnectionLines = () => {
    const allConnectionLines = document.querySelectorAll('.connection-line');
    allConnectionLines.forEach(line => {
      line.remove();
    })
  }

  const showChildren = (childList: string | null, currentTarget: HTMLDivElement) => {
    const currentTargetCoords = getElemCoords(currentTarget, "HTMLElement");
    const childListArray = childList!.split(",");

    childListArray.forEach(elementData => {
      const elementDataArray = elementData.split(":");
      const numberElementId = parseInt(elementDataArray[0], 10);
      const isAlternative = elementDataArray[1] === "true" ? 1 : 0;

      if (isNaN(numberElementId)) {
        return
      }

      const childElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);
      childElement?.setAttribute("data-is-active", "1");

      const childElementCoords = getElemCoords(childElement, "HTMLElement");
      const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

      if (currentTargetCoords && childElementCoords && (viewBoxOffsetX !== undefined) && (viewBoxOffsetY !== undefined)) {
        svgLine.setAttribute('class', 'connection-line');
        svgLine.setAttribute('x1', String(currentTargetCoords?.left - viewBoxOffsetX));
        svgLine.setAttribute('y1', String(currentTargetCoords?.top - viewBoxOffsetY));
        svgLine.setAttribute('x2', String(childElementCoords?.left - viewBoxOffsetX));
        svgLine.setAttribute('y2', String(childElementCoords?.top - viewBoxOffsetY));
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

  const showParents = (parentList: string | null, currentTarget: HTMLDivElement) => {
    const currentTargetCoords = getElemCoords(currentTarget, "HTMLElement");
    const parentsListArray = parentList!.split(",");

    parentsListArray.forEach(elementData => {
      const elementDataArray = elementData.split(":");
      const numberElementId = parseInt(elementDataArray[0], 10);
      const isAlternative = elementDataArray[1] === "true" ? 1 : 0;

      if (isNaN(numberElementId)) {
        return
      }

      const parentElement = document.querySelector<HTMLDivElement>(`[data-planet-id="${numberElementId}"]`);
      parentElement?.setAttribute("data-is-active", "1");
      const parentElementCoords = getElemCoords(parentElement, "HTMLElement");
      const parentList = parentElement!.getAttribute("data-planet-parent-list");
      const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      svgLine.setAttribute('class', 'connection-line');

      if (currentTargetCoords && parentElementCoords && (viewBoxOffsetX !== undefined) && (viewBoxOffsetY !== undefined)) {
        svgLine.setAttribute('class', 'connection-line');
        svgLine.setAttribute('x1', String(currentTargetCoords?.left - viewBoxOffsetX));
        svgLine.setAttribute('y1', String(currentTargetCoords?.top - viewBoxOffsetY));
        svgLine.setAttribute('x2', String(parentElementCoords?.left - viewBoxOffsetX));
        svgLine.setAttribute('y2', String(parentElementCoords?.top - viewBoxOffsetY));
      }

      if (isAlternative) {
        svgLine.setAttribute('stroke-dasharray', "10 5");
      }

      svgContainerRef.current?.append(svgLine);

      if (parentElement && parentList) {
        showParents(parentList, parentElement);
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
      parentElement?.setAttribute("data-is-active", "0");
      const parentList = parentElement!.getAttribute("data-planet-parent-list");

      if (parentList) {
        hideParents(parentList);
      }
    })
  }

  const handlePlanetMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    const childList = event.currentTarget.getAttribute("data-planet-children-list");
    const parentList = event.currentTarget.getAttribute("data-planet-parent-list")

    event.currentTarget.setAttribute('data-is-active', '1');

    showChildren(childList, event.currentTarget);
    showParents(parentList, event.currentTarget);
  }

  const handlePlanetMouseLeave = (event: React.MouseEvent<HTMLDivElement>) => {
    const childList = event.currentTarget.getAttribute("data-planet-children-list");
    const parentList = event.currentTarget.getAttribute("data-planet-parent-list");

    event.currentTarget.setAttribute('data-is-active', '0');

    hideChildren(childList);
    hideParents(parentList);
    deleteAllConnectionLines();
  }

  return (
      <div
          className="galaxy"
          style={{
            width: width,
            height: height,
          }}
      >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="galaxy__svg-container"
            viewBox={galaxyOrbitSettings.viewBox}
            width={width}
            height={height}
            ref={svgContainerRef}
        >
          {
            orbitList.map((orbits,index) => {
              galaxyOrbitSettings.backgroundWidth -= orbitWidthStep;
              galaxyOrbitSettings.backgroundHeight -= orbitHeightStep;
              return (
                  <ellipse
                      key={index}
                      className={`galaxy__ellipse-${index}`}
                      rx={galaxyOrbitSettings.backgroundWidth / 2}
                      ry={galaxyOrbitSettings.backgroundHeight / 2}
                      cx="50%"
                      cy="50%"/>
              )
            })
          }
        </svg>
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