import React from "react";

import { addActivePlanet } from "@entities/galaxy/lib/addActivePlanet";
import { getElemCoords } from "@entities/galaxy/lib/getElemCoords";
import { DATA_PLANET_ID } from "@entities/orbit/model/types";

interface IShowChildren {
  childrenList: string | null;
  currentTarget: HTMLDivElement;
  planetWidth: number;
  planetHeight: number;
  svgContainer: SVGElement | null;
  setActivePlanets: React.Dispatch<React.SetStateAction<Array<number>>>;
}

//функция создания svg линий связи между текущей планетой и всеми ее child зависимостями
//изменения dataset атрбута (атрибут активности при наведении)
export const showPlanetsChildren = (params: IShowChildren) => {
  const {
    childrenList,
    currentTarget,
    planetHeight,
    planetWidth,
    svgContainer,
    setActivePlanets,
  } = params;

  const currentTargetCoords = getElemCoords({
    element: currentTarget,
    elementWidth: planetWidth,
    elementHeight: planetHeight,
  });

  const childrenListArray = childrenList!.split(",");

  //для каждой child зависимости построение связи
  childrenListArray.forEach((child) => {
    const elementData = child.split(":");
    const [elementId, isAlternative] = elementData;

    const numberElementId = Number(elementId);
    const booleanIsAlternative = isAlternative === "true";

    if (isNaN(numberElementId)) {
      return;
    }

    addActivePlanet({
      activePlanetId: numberElementId,
      setActivePlanets,
    });

    const childElement = document.querySelector<HTMLElement>(
      `[${DATA_PLANET_ID}="${numberElementId}"]`
    );

    const childElementCoords = getElemCoords({
      element: childElement,
      elementWidth: planetWidth,
      elementHeight: planetHeight,
    });

    const svgLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    //позиционирование и стилизация линии
    if (currentTargetCoords && childElementCoords) {
      svgLine.setAttribute(
        "class",
        "galaxy-page__svg-container--connection-line"
      );
      svgLine.setAttribute("x1", String(currentTargetCoords?.left));
      svgLine.setAttribute("y1", String(currentTargetCoords?.top));
      svgLine.setAttribute("x2", String(childElementCoords?.left));
      svgLine.setAttribute("y2", String(childElementCoords?.top));
    }

    //установка атрибута пунктира, если путь альтернативен
    if (booleanIsAlternative) {
      svgLine.setAttribute("stroke-dasharray", "10 5");
    }

    svgContainer?.append(svgLine);
  });
};
