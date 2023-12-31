import { isConnectionOverlapped } from '@entities/galaxy/libs/helpers/isConnectionOverlapped';

interface IGetCoordsForConnection {
    currentTarget: {
        top: number;
        left: number;
    };
    elementToConnect: {
        top: number;
        left: number;
    };
    svgContainer: SVGElement | null;
    swingCountProp?: number;
}

//рекурсивная функция получения координат между элементами
//при наложении линий выбирается новое место, места выбираются то с одного края, то с другого от построенных связей
//после выбора нового места проходит проверка на наложение
export const getCoordsForConnection = (
    params: IGetCoordsForConnection,
): IGetCoordsForConnection => {
    const {
        currentTarget,
        elementToConnect,
        svgContainer,
        swingCountProp,
    } =
        params;

    //swingCount: количество изменений направления при наложении
    //swingDirection: множитель направления для следующей связи (1 или -1)
    let swingCount = swingCountProp || 1;
    let swingDirection;

    //step: расстояние между линиями, в px
    //offset: отступ от текущей связи
    const step = 4;
    const offset = step * swingCount;

    //проверка на наложение связей
    const isOverlapped = isConnectionOverlapped({
        currentTargetCoords: currentTarget,
        elementToConnectCoords: elementToConnect,
        svgContainer,
        svgLineClass: '.galaxy__connection-line',
    });

    //чередование места создания связи в зависимости от количества связей
    !(swingCount % 2) ? (swingDirection = -1) : (swingDirection = 1);

    //если было наложение(место занято) - поиск следующего места
    if (isOverlapped) {
        return getCoordsForConnection({
            currentTarget: {
                top: currentTarget.top + offset * swingDirection,
                left: currentTarget.left + offset * swingDirection,
            },
            elementToConnect: {
                top: elementToConnect.top + offset * swingDirection,
                left: elementToConnect.left + offset * swingDirection,
            },
            swingCountProp: ++swingCount,
            svgContainer,
        });
    }

    //если не было наложения(место свободно) - вернуть координаты места
    return {
        currentTarget,
        elementToConnect,
        swingCountProp: swingCount,
        svgContainer,
    };
};