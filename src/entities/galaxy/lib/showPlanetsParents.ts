import { getColorFromShelf } from '@entities/galaxy/lib/colorShelf';
import { getCoordsForConnection } from '@entities/galaxy/lib/getCoordsForConnection';
import { getElemCoords } from '@entities/galaxy/lib/getElemCoords';
import {
    ACTIVE_PLANET,
    HTML_ELEMENT,
} from '@entities/galaxy/model/constants';

interface IShowPlanetsParents {
  parentsList: string | null;
  currentTarget: HTMLDivElement;
  planetWidth: number;
  planetHeight: number;
  viewBoxOffsetX: number;
  viewBoxOffsetY: number;
  svgContainer: SVGSVGElement | null;
  color?: string | null;
}

//рекурсивная функция изменения создания связей между текущей и всеми ее parent зависимостями
//так же изменения dataset атрбута для всех parent зависимостей планеты
//связи и атрибуты будут настроены у всех зависимых элементов вплоть до крайнего parent элемента без зависимостей
//(атрибут активности при наведении)
export const showPlanetsParents = (params: IShowPlanetsParents) => {
    const {
        parentsList,
        currentTarget,
        planetWidth,
        planetHeight,
        viewBoxOffsetX,
        viewBoxOffsetY,
        svgContainer,
    } = params;

    const currentTargetCoords = getElemCoords({
        elem: currentTarget,
        type: HTML_ELEMENT,
        planetWidth,
        planetHeight,
    });

    if (parentsList === null) {
        return;
    }

    const parentsListArray = parentsList.split(',');

    parentsListArray?.forEach((parent) => {
        let color = params.color || null;

        const elementData = parent.split(':');
        const [elementId, isAlternative] = elementData;

        const numberElementId = Number(elementId);
        const booleanIsAlternative = isAlternative === 'true';

        if (isNaN(numberElementId)) {
            return;
        }

        const parentElement = document.querySelector<HTMLDivElement>(
            `[data-planet-id="${numberElementId}"]`,
        );

        const parentElementCoords = getElemCoords({
            elem: parentElement,
            type: HTML_ELEMENT,
            planetWidth,
            planetHeight,
        });

        const parentsListOfCurrentParent = parentElement?.getAttribute(
            'data-planet-parent-list',
        );
        parentElement?.setAttribute('data-is-active', ACTIVE_PLANET);

        const svgLine = document.createElementNS(
            'http://www.w3.org/2000/svg',
            'line',
        );

        //поиск и установка координат для связи
        if (currentTargetCoords && parentElementCoords) {
            const lineCoordsWithoutOverlaps = getCoordsForConnection({
                currentTarget: currentTargetCoords,
                elementToConnect: parentElementCoords,
                svgContainer,
                viewBoxOffsetX,
                viewBoxOffsetY,
            });

            svgLine.setAttribute(
                'x1',
                String(lineCoordsWithoutOverlaps?.currentTarget.left - viewBoxOffsetX),
            );
            svgLine.setAttribute(
                'y1',
                String(lineCoordsWithoutOverlaps?.currentTarget.top - viewBoxOffsetY),
            );
            svgLine.setAttribute(
                'x2',
                String(
                    lineCoordsWithoutOverlaps?.elementToConnect.left - viewBoxOffsetX,
                ),
            );
            svgLine.setAttribute(
                'y2',
                String(lineCoordsWithoutOverlaps?.elementToConnect.top - viewBoxOffsetY),
            );
            svgLine.setAttribute('class', 'galaxy__connection-line');
            svgLine.setAttribute('stroke', 'white');
        }

        if (booleanIsAlternative) {
            svgLine.setAttribute('stroke-dasharray', '10 5');

            //забираем модификатор с полки
            color = getColorFromShelf();
        }

        //цвета связей
        if (color) {
            svgLine.setAttribute(
                'class',
                `${svgLine?.getAttribute('class')} galaxy__connection-line_${color}`,
            );
        }

        svgContainer?.append(svgLine);

        //если у текущего parent элемента есть parent зависимости
        if (parentElement && parentsListOfCurrentParent) {
            showPlanetsParents({
                parentsList: parentsListOfCurrentParent,
                currentTarget: parentElement,
                planetWidth,
                planetHeight,
                viewBoxOffsetX,
                viewBoxOffsetY,
                svgContainer,
                color,
            });
        }
    });
};