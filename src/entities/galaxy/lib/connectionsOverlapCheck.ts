import React from "react";

interface IConnectionsOverlapCheck {
    currentTargetCoords: { top: number, left: number },
    elementToConnectCoords: { top: number, left: number },
    viewBoxOffsetX: number | undefined,
    viewBoxOffsetY: number | undefined,
    svgContainer: SVGSVGElement | null,
}

export const connectionsOverlapCheck = (props: IConnectionsOverlapCheck) => {
    const {
        currentTargetCoords,
        elementToConnectCoords,
        viewBoxOffsetX,
        viewBoxOffsetY,
        svgContainer
    } = props

    if (!svgContainer) {
        return
    }

    const elementsFromSvgContainer = Array.from(svgContainer.children || []);
    const allConnectionLines = elementsFromSvgContainer.filter(element => element.matches(".connection-line"));

    const checkResult = allConnectionLines.findIndex(line => {
            if (viewBoxOffsetX !== undefined && viewBoxOffsetY !== undefined) {
                return line.getAttribute("x1") === String(currentTargetCoords.left - viewBoxOffsetX) &&
                    line.getAttribute("y1") === String(currentTargetCoords.top - viewBoxOffsetY) &&
                    line.getAttribute("x2") === String(elementToConnectCoords.left - viewBoxOffsetX) &&
                    line.getAttribute("y2") === String(elementToConnectCoords.top - viewBoxOffsetY)
            }
        }
    )

    return checkResult > -1;
}