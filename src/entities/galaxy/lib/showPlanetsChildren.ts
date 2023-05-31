import { getElemCoords } from "@entities/galaxy/lib/getElemCoords";
import { ACTIVE_PLANET, HTML_ELEMENT } from "@entities/galaxy/model/constants";

interface IShowChildren {
  childrenList: string | null;
  currentTarget: HTMLDivElement;
  planetWidth: number;
  planetHeight: number;
  viewBoxOffsetX: number;
  viewBoxOffsetY: number;
  svgContainer: SVGSVGElement | null;
}

//функция создания svg линий связи между текущей планетой и всеми ее child зависимостями
//изменения dataset атрбута (атрибут активности при наведении)
export const showPlanetsChildren = (params: IShowChildren) => {
  const {
    childrenList,
    currentTarget,
    planetHeight,
    planetWidth,
    viewBoxOffsetX,
    viewBoxOffsetY,
    svgContainer,
  } = params;

  const currentTargetCoords = getElemCoords({
    elem: currentTarget,
    type: HTML_ELEMENT,
    planetWidth,
    planetHeight,
  });

  if (childrenList === null) {
    return;
  }

  const childrenListArray = childrenList.split(",");

  //для каждой child зависимости построение связи
  childrenListArray.forEach((child) => {
    const elementData = child.split(":");
    const [elementId, isAlternative] = elementData;

    const numberElementId = Number(elementId);
    const booleanIsAlternative = isAlternative === "true";

    if (isNaN(numberElementId)) {
      return;
    }

    const childElement = document.querySelector<HTMLElement>(
      `[data-planet-id="${numberElementId}"]`
    );

    const childElementCoords = getElemCoords({
      elem: childElement,
      type: HTML_ELEMENT,
      planetWidth,
      planetHeight,
    });

    const svgLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );

    childElement?.setAttribute("data-is-active", ACTIVE_PLANET);

    //позиционирование и стилизация линии
    if (currentTargetCoords && childElementCoords) {
      svgLine.setAttribute("class", "galaxy__connection-line");
      svgLine.setAttribute(
        "x1",
        String(currentTargetCoords?.left - viewBoxOffsetX)
      );
      svgLine.setAttribute(
        "y1",
        String(currentTargetCoords?.top - viewBoxOffsetY)
      );
      svgLine.setAttribute(
        "x2",
        String(childElementCoords?.left - viewBoxOffsetX)
      );
      svgLine.setAttribute(
        "y2",
        String(childElementCoords?.top - viewBoxOffsetY)
      );
    }

    //установка атрибута пунктира, если путь альтернативен
    if (booleanIsAlternative) {
      svgLine.setAttribute("stroke-dasharray", "10 5");
    }

    svgContainer?.append(svgLine);
  });
};