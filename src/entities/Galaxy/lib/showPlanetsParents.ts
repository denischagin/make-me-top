import {getElemCoords} from "@entities/Galaxy/lib/getElemCoords";
import {getCoordsForConnection} from "@entities/Galaxy/lib/getCoordsForConnection";
import {getColorFromShelf} from "@entities/Galaxy/lib/colorShelf";

import { PlanetProgressTypes } from "@shared/types/common";
import {DATA_PLANET_CHILDREN_LIST, DATA_PLANET_ID, DATA_PLANET_PROGRESS_TYPE} from "@entities/Orbit/model/types";

interface IShowPlanetsParents {
    parentsList: string | null,
    currentTarget: HTMLDivElement,
    planetWidth: number,
    planetHeight: number,
    svgContainer : SVGElement | null,
    color?: string | null,
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
        svgContainer,
    } = params

    const currentTargetCoords = getElemCoords({
        elem: currentTarget,
        type: "HTMLElement",
        planetWidth,
        planetHeight
    });

    const parentsListArray = parentsList?.split(",");

    parentsListArray?.forEach(parent => {
        let color = params.color || null;

        const elementData = parent.split(":");
        const [elementId, isAlternative] = elementData;

        const numberElementId = Number(elementId);
        const booleanIsAlternative = isAlternative === "true";

        if (isNaN(numberElementId)) {
            return
        }

        const parentElement = document.querySelector<HTMLDivElement>(`[${DATA_PLANET_ID}="${numberElementId}"]`);

        const parentElementCoords = getElemCoords({
            elem: parentElement,
            type: "HTMLElement",
            planetWidth,
            planetHeight
        });

        const parentsListOfCurrentParent = parentElement?.getAttribute(DATA_PLANET_CHILDREN_LIST);
        parentElement?.setAttribute("data-is-active", "1");

        const svgLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');

        //поиск и установка координат для связи
        if (currentTargetCoords && parentElementCoords) {
            const lineCoordsWithoutOverlaps = getCoordsForConnection({
                currentTarget: currentTargetCoords,
                elementToConnect: parentElementCoords,
                svgContainer,
            })

            svgLine.setAttribute('x1', String(lineCoordsWithoutOverlaps?.currentTarget.left));
            svgLine.setAttribute('y1', String(lineCoordsWithoutOverlaps?.currentTarget.top));
            svgLine.setAttribute('x2', String(lineCoordsWithoutOverlaps?.elementToConnect.left));
            svgLine.setAttribute('y2', String(lineCoordsWithoutOverlaps?.elementToConnect.top));
            svgLine.setAttribute('class', 'galaxy__connection-line');
            svgLine.setAttribute('stroke', "white");
        }

        if (booleanIsAlternative) {
            svgLine.setAttribute('stroke-dasharray', "10 5");
            color = getColorFromShelf();
        }

        //WIP цвета связей
        if (color) {
            svgLine.setAttribute('class', `${svgLine?.getAttribute("class")} galaxy__connection-line_${color}`);
        }

        svgContainer?.append(svgLine);

        //если планета, к которой будем строить связь,
        //открыта или в процессе изучения, то дальше связи не строим
        const parentElementProgress = parentElement?.getAttribute(DATA_PLANET_PROGRESS_TYPE);

        if (parentElementProgress === PlanetProgressTypes.SYSTEM_OPEN  || parentElementProgress === PlanetProgressTypes.SYSTEM_EDUCATION) {
            return;
        }

        //если у текущего parent элемента есть parent зависимости
        if (parentElement && parentsListOfCurrentParent) {
            showPlanetsParents({
                parentsList: parentsListOfCurrentParent,
                currentTarget: parentElement,
                planetWidth,
                planetHeight,
                svgContainer,
                color,
            });
        }
    })
}
