import {getElemCoords} from "@entities/Galaxy/lib/getElemCoords";

interface IShowChildren {
    childrenList: string | null,
    currentTarget: HTMLDivElement,
    planetWidth: number,
    planetHeight: number,
    svgContainer: SVGElement | null,
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
    } = params

    const currentTargetCoords = getElemCoords({
        elem: currentTarget,
        type: "HTMLElement",
        planetWidth,
        planetHeight
    });

    const childrenListArray = childrenList!.split(",");

    //для каждой child зависимости построение связи
    childrenListArray.forEach(child => {
        const elementData = child.split(":");
        const [elementId, isAlternative] = elementData;

        const numberElementId = Number(elementId);
        const booleanIsAlternative = isAlternative === "true";

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

        //позиционирование и стилизация линии
        if (currentTargetCoords && childElementCoords) {
            svgLine.setAttribute('class', 'galaxy__connection-line');
            svgLine.setAttribute('x1', String(currentTargetCoords?.left));
            svgLine.setAttribute('y1', String(currentTargetCoords?.top));
            svgLine.setAttribute('x2', String(childElementCoords?.left));
            svgLine.setAttribute('y2', String(childElementCoords?.top));
        }

        //установка атрибута пунктира, если путь альтернативен
        if (booleanIsAlternative) {
            svgLine.setAttribute('stroke-dasharray', "10 5");
        }

        svgContainer?.append(svgLine);
    })
}
