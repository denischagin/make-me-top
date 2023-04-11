import React, {createRef} from "react";

import { OrbitType } from "@entities/galaxy/model/types";
import Orbit from "../../../shared/Orbit/orbit";
import "./style.scss";

interface IGalaxyProps {
  orbitList: Array<OrbitType>;
  width: number;
  height: number;
  planetWidth: number,
  planetHeight: number,
}

const Galaxy: React.FC<IGalaxyProps> = (props) => {
  const { orbitList, width, height, planetWidth, planetHeight } = props;
  const svgContainerRef = createRef<SVGSVGElement>()

  const galaxyOrbitSettings = {
    width: width,
    backgroundWidth: width,
    height: height,
    backgroundHeight: height,
    viewBox: `0 0 ${width} ${height}`,
    orbitsColorId: 0,
    colorId: 0,
  };

  const getOrbitsColorById = (id: number) => {
    switch (id) {
      case 1:
        return "#272727";
      case 2:
        return "#1D1D1D";
      case 3:
        return "#131313";
      case 4:
        return "#101010";
    }
  };

  const getOrbitsSizeById = (id: number) => {
    switch (id) {
      case 1:
        return "#272727";
      case 2:
        return "#1D1D1D";
      case 3:
        return "#131313";
      case 4:
        return "#101010";
    }
  }

  function getElemCoords(elem: HTMLElement | null) {
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

    const top  = box.top +  scrollTop - clientTop + planetHeight/2;
    const left = box.left + scrollLeft - clientLeft + planetWidth/2;

    return { top: Math.round(top), left: Math.round(left) };
  }

  const showChildren = (childList: string | null, currentTarget: HTMLDivElement) => {
    const currentTargetCoords = getElemCoords(currentTarget);
    const childListNumbersArray = childList!.split(",");

    childListNumbersArray.forEach(elementId => {
      if (elementId === '') {
        return
      }

      const numberElementId = parseInt(elementId, 10);
      const childElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);
      const childElementCoords = getElemCoords(childElement);
      childElement!.style.opacity = "0.5";

      const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      svgLine.setAttribute('class', 'connection-line');
      svgLine.setAttribute('x1', String(currentTargetCoords?.left));
      svgLine.setAttribute('y1', String(currentTargetCoords?.top));
      console.log(currentTargetCoords)
      svgLine.setAttribute('x2', String(childElementCoords?.left));
      svgLine.setAttribute('y2', String(childElementCoords?.top));
      svgContainerRef.current?.append(svgLine);
      console.log(childElementCoords)
      // console.log(svgContainerRef.current?.parentElement, childElement!.offsetParent!.parentElement!.parentElement);
    })
  }

  const hideChildren = (childList: string | null) => {
    const childListNumbersArray = childList!.split(",");

    childListNumbersArray.forEach(elementId => {
      if (elementId === '') {
        return
      }

      const numberElementId = parseInt(elementId, 10);
      const childElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);
      childElement!.style.opacity = "1";
    })
  }

  const showParents = (parentList: string | null) => {
    const parentsListArray = parentList!.split(",");

    parentsListArray.forEach(elementData => {
      const elementDataArray = elementData.split("-");
      const numberElementId = parseInt(elementDataArray[0], 10);
      const isAlternative = !!elementDataArray[1]

      if (isNaN(numberElementId)) {
        return
      }

      const parentElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);
      const parentList = parentElement!.getAttribute("data-planet-parent-list");
      parentElement!.style.opacity = "0.5";

      if (parentList) {
        showParents(parentList);
      }
    })
  }

  const hideParents = (parentList: string | null) => {
    const parentsListArray = parentList!.split(",");

    parentsListArray.forEach(elementData => {
      const elementDataArray = elementData.split("-");
      const numberElementId = parseInt(elementDataArray[0], 10);
      const isAlternative = !!elementDataArray[1]

      if (isNaN(numberElementId)) {
        return
      }

      const parentElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);
      const parentList = parentElement!.getAttribute("data-planet-parent-list");
      parentElement!.style.opacity = "1";

      if (parentList) {
        hideParents(parentList);
      }
    })
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
            viewBox={galaxyOrbitSettings.viewBox}
            className="galaxy__svg-container"
            width={width}
            height={height}
            ref={svgContainerRef}
        >
          {
            orbitList.map((orbits,index) => {
              galaxyOrbitSettings.backgroundWidth -= 400;
              galaxyOrbitSettings.backgroundHeight -= 150;
              galaxyOrbitSettings.orbitsColorId++;
              return (
                  <ellipse key={index} rx={galaxyOrbitSettings.backgroundWidth} ry={galaxyOrbitSettings.backgroundHeight} fill={getOrbitsColorById(galaxyOrbitSettings.orbitsColorId)} cx="50%" cy="50%"/>
              )
            })
          }
        </svg>
        {
          orbitList.map((orbits) => {
            galaxyOrbitSettings.width -= 400;
            galaxyOrbitSettings.height -= 150;
            galaxyOrbitSettings.colorId++;
            return (
                <Orbit
                    key={orbits.orbitId}
                    listPlanet={orbits.listPlanet}
                    orbitWidth={galaxyOrbitSettings.width}
                    orbitHeight={galaxyOrbitSettings.height}
                    planetStyle={{
                      color: "white",
                      width: planetWidth + "px",
                      height: planetHeight + "px"
                    }}
                    showChildren={showChildren}
                    showParents={showParents}
                    hideChildren={hideChildren}
                    hideParents={hideParents}
                    colorId={galaxyOrbitSettings.colorId}
                />
            );
          })
        }
      </div>
  );
};

export default Galaxy;