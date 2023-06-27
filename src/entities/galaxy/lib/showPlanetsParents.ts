import React from 'react';

import { addActivePlanet } from '@entities/galaxy/lib/addActivePlanet';
import { getColorFromShelf } from '@entities/galaxy/lib/colorShelf';
import { getCoordsForConnection } from '@entities/galaxy/lib/getCoordsForConnection';
import { getElemCoords } from '@entities/galaxy/lib/getElemCoords';

import { SystemProgressTypes } from '@shared/types/common';

import {
    DATA_PLANET_ID,
    DATA_PLANET_PARENT_LIST,
    DATA_PLANET_PROGRESS_TYPE,
} from '@entities/orbit/model/types';

interface IShowPlanetsParents {
  parentsList: string | null;
  currentTarget: HTMLDivElement;
  systemWidth: number;
  systemHeight: number;
  svgContainer: SVGElement | null;
  setActiveSystems: React.Dispatch<React.SetStateAction<Array<number>>>;
  color?: string | null;
}

//рекурсивная функция создания связей между текущей и всеми ее parent зависимостями
//связи и атрибуты будут настроены у всех зависимых элементов вплоть до крайнего parent элемента без зависимостей
//(атрибут активности при наведении)
export const showPlanetsParents = (params: IShowPlanetsParents) => {
    const {
        parentsList,
        currentTarget,
        systemWidth,
        systemHeight,
        svgContainer,
        setActiveSystems,
    } = params;

    const currentTargetCoords = getElemCoords({
        element: currentTarget,
        elementWidth: systemWidth,
        elementHeight: systemHeight,
    });

    const parentsListArray = parentsList?.split(',');

    parentsListArray?.forEach((parent) => {
        let color = params.color || null;

        const elementData = parent.split(':');
        const [elementId, isAlternative] = elementData;

        const numberElementId = Number(elementId);
        const booleanIsAlternative = isAlternative === 'true';

        if (isNaN(numberElementId)) {
            return;
        }

        addActivePlanet({
            activeSystemId: numberElementId,
            setActiveSystems,
        });

        const parentElement = document.querySelector<HTMLDivElement>(
            `[${DATA_PLANET_ID}="${numberElementId}"]`,
        );

        const parentElementCoords = getElemCoords({
            element: parentElement,
            elementWidth: systemWidth,
            elementHeight: systemHeight,
        });

        const parentsListOfCurrentParent = parentElement?.getAttribute(
            DATA_PLANET_PARENT_LIST,
        );

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
            });

            svgLine.setAttribute(
                'x1',
                String(lineCoordsWithoutOverlaps?.currentTarget.left),
            );
            svgLine.setAttribute(
                'y1',
                String(lineCoordsWithoutOverlaps?.currentTarget.top),
            );
            svgLine.setAttribute(
                'x2',
                String(lineCoordsWithoutOverlaps?.elementToConnect.left),
            );
            svgLine.setAttribute(
                'y2',
                String(lineCoordsWithoutOverlaps?.elementToConnect.top),
            );
            svgLine.setAttribute(
                'class',
                'galaxy-page__svg-container--connection-line',
            );
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
                `${svgLine?.getAttribute(
                    'class',
                )} galaxy-page__svg-container--connection-line--${color}`,
            );
        }

        svgContainer?.append(svgLine);

        //если планета, к которой будем строить связь,
        //открыта или в процессе изучения, то дальше связи не строим
        const parentElementProgressType = parentElement?.getAttribute(
            DATA_PLANET_PROGRESS_TYPE,
        );

        if (
            parentElementProgressType === SystemProgressTypes.SYSTEM_OPEN ||
            parentElementProgressType === SystemProgressTypes.SYSTEM_EDUCATION
        ) {
            return;
        }

        //если у текущего parent элемента есть parent зависимости
        if (parentElement && parentsListOfCurrentParent) {
            showPlanetsParents({
                parentsList: parentsListOfCurrentParent,
                currentTarget: parentElement,
                systemWidth,
                systemHeight,
                svgContainer,
                setActiveSystems,
                color,
            });
        }
    });
};
