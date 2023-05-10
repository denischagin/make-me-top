interface IDeleteAllConnectionLinesProps {
    svgContainer: SVGSVGElement | null,
}

//функция удаления всех элементов определенного класса в заданном svg контейнере
export const deleteAllConnectionLines = (props: IDeleteAllConnectionLinesProps) => {
    const {
        svgContainer,
    } = props

    //остановка если ref на контейнер еще не был создан
    if (!svgContainer) {
        return
    }

    //создание массива HTML элементов
    //каждый элемент является svg линией связи
    const elementsFromSvgContainer = Array.from(svgContainer.children || []);
    const allConnectionLines = elementsFromSvgContainer.filter(element => element.matches(".galaxy__connection-line"));

    //удаление каждой линии
    allConnectionLines.forEach(line => {
        line.remove();
    })
}
