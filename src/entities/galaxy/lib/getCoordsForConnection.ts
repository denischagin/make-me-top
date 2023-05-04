import {connectionsOverlapCheck} from "@entities/galaxy/lib/connectionsOverlapCheck";

interface IGetCoordsForConnectionProps {
    currentTarget: {
        top: number,
        left: number
    },
    elementToConnect: {
        top: number,
        left: number
    },
    svgContainer: SVGSVGElement | null,
    viewBoxOffsetY: number,
    viewBoxOffsetX: number,
    swingCountProp?: number,
}
export const getCoordsForConnection = (props: IGetCoordsForConnectionProps): IGetCoordsForConnectionProps => {
    const {
        currentTarget,
        elementToConnect,
        svgContainer,
        viewBoxOffsetY,
        viewBoxOffsetX,
        swingCountProp
    } = props

    let swingCount = swingCountProp || 1;
    let swingDirection;
    const step = 7;
    const offset = step * swingCount;

    const isOverlapped = connectionsOverlapCheck({
        currentTargetCoords: currentTarget,
        elementToConnectCoords: elementToConnect,
        viewBoxOffsetY,
        viewBoxOffsetX,
        svgContainer: svgContainer,
    });

    swingCount % 2 === 0 ? swingDirection = -1 : swingDirection = 1;

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
            svgContainer,
            viewBoxOffsetX,
            viewBoxOffsetY,
        });
    }

    return {
        currentTarget: currentTarget,
        elementToConnect: elementToConnect,
        swingCountProp: swingCount,
        svgContainer,
        viewBoxOffsetX,
        viewBoxOffsetY,
    }
}