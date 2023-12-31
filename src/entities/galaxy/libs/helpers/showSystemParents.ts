import React from 'react';

import { addActiveSystem } from '@entities/galaxy/libs/helpers/addActiveSystem';
import { getCoordsForConnection } from '@entities/galaxy/libs/helpers/getCoordsForConnection';
import { getElemCoords } from '@entities/galaxy/libs/helpers/getElemCoords';
import {
    CONNECTION_LINE_CLASS,
    SVG_NAMESPACE_URL,
} from '@entities/galaxy/model/constants';

import {
    DATA_SYSTEM_ID,
    DATA_SYSTEM_PARENT_LIST,
    DATA_SYSTEM_PROGRESS_TYPE,
} from '@entities/orbit/model/types';

import { SystemProgressTypes } from '@shared/types/common';
import { getColorFromShelf } from '@entities/galaxy/libs/helpers/colorShelf';

interface IShowPlanetsParents {
  parentsList: string | null;
  currentTarget: HTMLDivElement;
  systemWidth: number;
  systemHeight: number;
  svgContainer: SVGElement | null;
  setActiveSystemsIds: React.Dispatch<React.SetStateAction<Array<number>>>;
  color?: string | null;
}

//рекурсивная функция создания связей между текущей и всеми ее parent зависимостями
//связи и атрибуты будут настроены у всех зависимых элементов вплоть до крайнего parent элемента без зависимостей
//(атрибут активности при наведении)
export const showSystemParents = (params: IShowPlanetsParents) => {
    const {
        parentsList,
        currentTarget,
        systemWidth,
        systemHeight,
        svgContainer,
        setActiveSystemsIds,
    } = params;

    if (!parentsList || !svgContainer) {
        return;
    }

    const currentTargetCoords = getElemCoords({
        element: currentTarget,
        elementWidth: systemWidth,
        elementHeight: systemHeight,
    });

    const parentsListArray = parentsList.split(',');

    if (!parentsListArray) {
        return;
    }

    parentsListArray.forEach((parent) => {
        let color = params.color || null;

        const elementData = parent.split(':');
        const [elementId, isAlternative] = elementData;

        const numberElementId = Number(elementId);
        const booleanIsAlternative = isAlternative === 'true';

        if (isNaN(numberElementId)) {
            return;
        }

        addActiveSystem({
            activeSystemId: numberElementId,
            setActiveSystemsIds,
        });

        const parentElement = document.querySelector<HTMLDivElement>(
            `[${DATA_SYSTEM_ID}="${numberElementId}"]`,
        );

        if (!parentElement) {
            return;
        }

        const parentElementCoords = getElemCoords({
            element: parentElement,
            elementWidth: systemWidth,
            elementHeight: systemHeight,
        });

        const parentsListOfCurrentParent = parentElement.getAttribute(
            DATA_SYSTEM_PARENT_LIST,
        );

        const svgLine = document.createElementNS(
            SVG_NAMESPACE_URL,
            'line',
        );

        //поиск и установка координат для связи
        if (currentTargetCoords && parentElementCoords) {
            const lineCoordsWithoutOverlaps = getCoordsForConnection({
                currentTarget: currentTargetCoords,
                elementToConnect: parentElementCoords,
                svgContainer,
            });

            if (!lineCoordsWithoutOverlaps) {
                return;
            }

            svgLine.setAttribute(
                'x1',
                String(lineCoordsWithoutOverlaps.currentTarget.left),
            );
            svgLine.setAttribute(
                'y1',
                String(lineCoordsWithoutOverlaps.currentTarget.top),
            );
            svgLine.setAttribute(
                'x2',
                String(lineCoordsWithoutOverlaps.elementToConnect.left),
            );
            svgLine.setAttribute(
                'y2',
                String(lineCoordsWithoutOverlaps.elementToConnect.top),
            );
            svgLine.setAttribute(
                'class',
                `${CONNECTION_LINE_CLASS}`,
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
                `${svgLine.getAttribute(
                    'class',
                )} ${CONNECTION_LINE_CLASS}--${color}`,
            );
        }

        svgContainer.append(svgLine);

        //если планета, к которой будем строить связь,
        //открыта или в процессе изучения, то дальше связи не строим
        const parentElementProgressType = parentElement.getAttribute(
            DATA_SYSTEM_PROGRESS_TYPE,
        );

        if (
            (parentElementProgressType === SystemProgressTypes.SYSTEM_OPEN) ||
            (parentElementProgressType === SystemProgressTypes.SYSTEM_EDUCATION)
        ) {
            return;
        }

        //если у текущего parent элемента есть parent зависимости
        if (parentElement && parentsListOfCurrentParent) {
            showSystemParents({
                parentsList: parentsListOfCurrentParent,
                currentTarget: parentElement,
                systemWidth,
                systemHeight,
                svgContainer,
                setActiveSystemsIds,
                color,
            });
        }
    });
};
