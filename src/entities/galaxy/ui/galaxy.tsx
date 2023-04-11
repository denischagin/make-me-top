import React, {createRef} from "react";

import { OrbitType } from "@entities/galaxy/model/types";
import Orbit from "../../../shared/Orbit/orbit";
import "./style.scss";

interface IGalaxyProps {
  orbitList: Array<OrbitType>;
  width: number;
  height: number;
}

const Galaxy: React.FC<IGalaxyProps> = (props) => {
  const { orbitList, width, height } = props;
  const svgContainerRef = createRef<SVGSVGElement>()

  const galaxyOrbitSettings = {
    width: width,
    backgroundWidth: width + 400,
    height: height,
    backgroundHeight: height + 150,
    viewBox: `0 0 ${width * 2} ${height}`,
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

  const showChildren = (childList: string | null, currentTarget: HTMLDivElement) => {
    const childListNumbersArray = childList!.split(",");

    childListNumbersArray.forEach(elementId => {
      if (elementId === '') {
        return
      }

      const numberElementId = parseInt(elementId, 10);
      const childElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);
      childElement!.style.opacity = "0.5";

      const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      svgLine.setAttribute('class', 'connection-line');
      svgLine.setAttribute('x1', currentTarget.style.left);
      svgLine.setAttribute('y1',  currentTarget.style.top);
      svgLine.setAttribute('x2', childElement!.style.left);
      svgLine.setAttribute('y2', childElement!.style.top);
      svgLine.setAttribute('stroke', "white");
      svgContainerRef.current?.append(svgLine);
      console.log(svgContainerRef.current?.parentElement);
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
                      width: "80px",
                      height: "80px",
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