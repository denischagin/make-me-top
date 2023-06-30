import { restoreColorShelf } from '@entities/galaxy/lib/colorShelf';

interface IDeleteAllConnectionLines {
  svgContainer: SVGElement | null;
}

//функция удаления всех элементов определенного класса в заданном svg контейнере
export const deleteAllConnectionLines = (params: IDeleteAllConnectionLines) => {
    const {
        svgContainer,
    } = params;

    //остановка если ref на контейнер еще не был создан
    if (!svgContainer) {
        return;
    }

    //создание массива найденных HTML элементов
    //каждый элемент является svg линией связи
    const elementsFromSvgContainer = Array.from(svgContainer.children || []);
    const allConnectionLines = elementsFromSvgContainer.filter((element) =>
        element.matches('.galaxy-page__svg-container--connection-line'),
    ); // TODO избавиться от создания массива элементов, удалять сразу

    //удаление каждой линии
    allConnectionLines.forEach((line) => {
        line.remove();
    });

    //восстановление набора цветов
    restoreColorShelf();
};