interface IIsConnectionOverlapped {
    currentTargetCoords: { top: number, left: number },
    elementToConnectCoords: { top: number, left: number },
    svgContainer: SVGElement | null,
    svgLineClass: string,
}

//проверка наличия связи между планетами
export const isConnectionOverlapped = (params: IIsConnectionOverlapped) => {
    const {
        currentTargetCoords,
        elementToConnectCoords,
        svgContainer,
        svgLineClass,
    } = params

    //остановка если ref на контейнер еще не был создан
    if (!svgContainer) {
        return
    }

    //создание массива HTML элементов
    //каждый элемент является svg линией связи
    const elementsFromSvgContainer = Array.from(svgContainer.children || []);
    const allConnectionLines = elementsFromSvgContainer.filter(element => element.matches(svgLineClass));

    //проверка наличия связи между планетами по точным координатам
    const checkResult = allConnectionLines.findIndex(line => {
        return line.getAttribute("x1") === String(currentTargetCoords.left) &&
            line.getAttribute("y1") === String(currentTargetCoords.top) &&
            line.getAttribute("x2") === String(elementToConnectCoords.left) &&
            line.getAttribute("y2") === String(elementToConnectCoords.top)
        }
    )

    //если элемент был найден, то возвращает true, иначе false
    return checkResult > -1;
}
