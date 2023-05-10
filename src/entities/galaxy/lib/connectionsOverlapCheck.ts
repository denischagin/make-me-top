interface IConnectionsOverlapCheck {
    currentTargetCoords: { top: number, left: number },
    elementToConnectCoords: { top: number, left: number },
    viewBoxOffsetX: number | undefined,
    viewBoxOffsetY: number | undefined,
    svgContainer: SVGSVGElement | null,
}

//проверка наличия связи между планетами
export const connectionsOverlapCheck = (props: IConnectionsOverlapCheck) => {
    const {
        currentTargetCoords,
        elementToConnectCoords,
        viewBoxOffsetX,
        viewBoxOffsetY,
        svgContainer
    } = props

    //остановка если ref на контейнер еще не был создан
    if (!svgContainer) {
        return
    }

    //создание массива HTML элементов
    //каждый элемент является svg линией связи
    const elementsFromSvgContainer = Array.from(svgContainer.children || []);
    const allConnectionLines = elementsFromSvgContainer.filter(element => element.matches(".galaxy__connection-line"));

    //проверка наличия связи между планетами по точным координатам
    const checkResult = allConnectionLines.findIndex(line => {
            if (viewBoxOffsetX !== undefined && viewBoxOffsetY !== undefined) {
                return line.getAttribute("x1") === String(currentTargetCoords.left - viewBoxOffsetX) &&
                    line.getAttribute("y1") === String(currentTargetCoords.top - viewBoxOffsetY) &&
                    line.getAttribute("x2") === String(elementToConnectCoords.left - viewBoxOffsetX) &&
                    line.getAttribute("y2") === String(elementToConnectCoords.top - viewBoxOffsetY)
            }
        }
    )

    //если элемент был найден, то возвращает true, иначе false
    return checkResult > -1;
}
