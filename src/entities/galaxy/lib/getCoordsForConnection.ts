import { isConnectionOverlapped } from '@entities/galaxy/lib/isConnectionOverlapped';

interface IGetCoordsForConnection {
    currentTarget: {
        top: number;
        left: number;
    };
    elementToConnect: {
        top: number;
        left: number;
    };
    svgContainer: SVGSVGElement | null;
    viewBoxOffsetY: number;
    viewBoxOffsetX: number;
    swingCountProp?: number;
}

//рекурсивная функция получения координат между элементами
//при наложении линии выбирается новое место, места выбираются то с одного края, то с другого от построенных связей
//после выбора нового места проходит проверка на наложение
export const getCoordsForConnection = (params: IGetCoordsForConnection): IGetCoordsForConnection => {
    const {
        currentTarget,
        elementToConnect,
        svgContainer,
        viewBoxOffsetY,
        viewBoxOffsetX,
        swingCountProp,
    } = params;

    //swingCount: количество изменений направления при наложении
    //swingDirection: множитель направления для следующей связи (1 или -1)
    let swingCount = swingCountProp || 1;
    let swingDirection;

    //step: расстояние между линиями
    //offset: отступ от текущей связи
    const step = 7;
    const offset = step * swingCount;

    //проверка на наложение связей
    const isOverlapped = isConnectionOverlapped({
        currentTargetCoords: currentTarget,
        elementToConnectCoords: elementToConnect,
        viewBoxOffsetY,
        viewBoxOffsetX,
        svgContainer,
        svgLineClass: '.galaxy__connection-line',
    });

    //чередование направления в зависимости от их количества
    swingCount % 2 === 0 ? (swingDirection = -1) : (swingDirection = 1);

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
            viewBoxOffsetX,
            viewBoxOffsetY,
        });
    }

    //если не было наложения(место свободно) - вернуть координаты места
    return {
        currentTarget,
        elementToConnect,
        swingCountProp: swingCount,
        svgContainer,
        viewBoxOffsetX,
        viewBoxOffsetY,
    };
};
