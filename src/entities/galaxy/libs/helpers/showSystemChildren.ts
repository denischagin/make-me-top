import React from 'react';

import { addActiveSystem } from '@entities/galaxy/libs/helpers/addActiveSystem';
import {
    CONNECTION_LINE_CLASS,
    SVG_NAMESPACE_URL,
} from '@entities/galaxy/model/constants';

import { DATA_SYSTEM_ID } from '@entities/orbit/model/types';
import { getElemCoords } from '@entities/galaxy/libs/helpers/getElemCoords';

interface IShowChildren {
  childrenList: string | null;
  currentTarget: HTMLDivElement;
  systemWidth: number;
  systemHeight: number;
  svgContainer: SVGElement | null;
  setActiveSystemsIds: React.Dispatch<React.SetStateAction<Array<number>>>;
}

//функция создания svg линий связи между текущей планетой и всеми ее child зависимостями
//изменения dataset атрбута (атрибут активности при наведении)
export const showSystemChildren = (params: IShowChildren) => {
    const {
        childrenList,
        currentTarget,
        systemHeight,
        systemWidth,
        svgContainer,
        setActiveSystemsIds,
    } = params;

    if (!childrenList || !svgContainer) {
        return;
    }

    const currentTargetCoords = getElemCoords({
        element: currentTarget,
        elementWidth: systemWidth,
        elementHeight: systemHeight,
    });

    const childrenListArray = childrenList.split(',');

    //для каждой child зависимости построение связи
    childrenListArray.forEach((child) => {
        const elementData = child.split(':');
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

        const childElement = document.querySelector<HTMLElement>(
            `[${DATA_SYSTEM_ID}="${numberElementId}"]`,
        );

        const childElementCoords = getElemCoords({
            element: childElement,
            elementWidth: systemWidth,
            elementHeight: systemHeight,
        });

        const svgLine = document.createElementNS(
            SVG_NAMESPACE_URL,
            'line',
        );

        //позиционирование и стилизация линии
        if (currentTargetCoords && childElementCoords) {
            svgLine.setAttribute(
                'class',
                `${CONNECTION_LINE_CLASS}`,
            );
            svgLine.setAttribute('x1', String(currentTargetCoords?.left));
            svgLine.setAttribute('y1', String(currentTargetCoords?.top));
            svgLine.setAttribute('x2', String(childElementCoords?.left));
            svgLine.setAttribute('y2', String(childElementCoords?.top));
        }

        //установка атрибута пунктира, если путь альтернативен
        if (booleanIsAlternative) {
            svgLine.setAttribute('stroke-dasharray', '10 5');
        }

        svgContainer.append(svgLine);
    });
};
