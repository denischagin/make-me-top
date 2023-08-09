import {
    ACTIVE_STAR_MODIFIER,
    STAR_CLASS,
} from '@entities/galaxy/model/constants';

import { DATA_SYSTEM_ID } from '@entities/orbit/model/types';

interface SetSystemActivityToActive {
    activeSystemsId: Array<number>,
}

//функция изменения модификаторов активности на "Активный" определенных систем в галактике
export const setStarsActivityToActive = (params: SetSystemActivityToActive) => {
    const {
        activeSystemsId,
    } = params;

    activeSystemsId.forEach((systemId) => {
        //поиск активного элемента
        const system = document.querySelector<HTMLElement>(
            `[${DATA_SYSTEM_ID}="${systemId}"]`,
        );

        //если не был найден
        if (!system) {
            return;
        }

        //спускаемся на несколько узлов ниже (из элемента с data атрибутами к компоненту Star),
        //что бы заменить там модификатор
        const systemChild = system.querySelector(`.${STAR_CLASS}`);

        //если не был найден
        if (!systemChild) {
            return;
        }

        //заменяем модификатор
        systemChild.setAttribute(
            'class',
            `${STAR_CLASS} ${ACTIVE_STAR_MODIFIER}`,
        );
    });
};