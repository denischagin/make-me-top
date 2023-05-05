import {getElemCoords} from "@entities/galaxy/lib/getElemCoords";

interface IShowChildrenProps {
    childrenList: string | null,
    currentTarget: HTMLDivElement,
    planetWidth: number,
    planetHeight: number,
    viewBoxOffsetX: number | undefined,
    viewBoxOffsetY: number | undefined,
    svgContainer: SVGSVGElement | null,
}

export const showPlanetsChildren = (props: IShowChildrenProps) => {
    const {
        childrenList,
        currentTarget,
        planetHeight,
        planetWidth,
        viewBoxOffsetX,
        viewBoxOffsetY,
        svgContainer,
    } = props

    const currentTargetCoords = getElemCoords({
        elem: currentTarget,
        type: "HTMLElement",
        planetWidth,
        planetHeight
    });

    const childrenListArray = childrenList!.split(",");

    childrenListArray.forEach(elementData => {
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
            svgLine.setAttribute('class', 'galaxy__connection-line');
            svgLine.setAttribute('x1', String(currentTargetCoords?.left - viewBoxOffsetX));
            svgLine.setAttribute('y1', String(currentTargetCoords?.top - viewBoxOffsetY));
            svgLine.setAttribute('x2', String(childElementCoords?.left - viewBoxOffsetX));
            svgLine.setAttribute('y2', String(childElementCoords?.top - viewBoxOffsetY));
            svgLine.setAttribute('stroke', "white");
        }

        if (isAlternative) {
            svgLine.setAttribute('stroke-dasharray', "10 5");
        }

        svgContainer?.append(svgLine);
    })
}
