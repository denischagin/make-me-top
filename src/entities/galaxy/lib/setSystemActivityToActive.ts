import {
    ACTIVE_SYSTEM_MODIFIER,
    SYSTEM_CLASS,
} from '@entities/galaxy/model/constants';

import { DATA_SYSTEM_ID } from '@entities/orbit/model/types';

interface SetSystemActivityToActive {
    activeSystemsId: Array<number>,
}

//функция изменения модификаторов активности на "Активный" определенных систем в галактике
export const setSystemsActivityToActive = (params: SetSystemActivityToActive) => {
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

        //спускаемся на несколько узлов ниже (из элемента с data атрибутами к компоненту System),
        //что бы заменить там модификатор
        const systemChild = system.querySelector(`.${SYSTEM_CLASS}`);

        //если не был найден
        if (!systemChild) {
            return;
        }

        //заменяем модификатор
        systemChild.setAttribute(
            'class',
            `${SYSTEM_CLASS} ${ACTIVE_SYSTEM_MODIFIER}`,
        );
    });
};