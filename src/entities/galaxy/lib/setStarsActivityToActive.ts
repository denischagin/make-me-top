import { DATA_SYSTEM_ID } from '@entities/orbit/model/types';

interface SetStarsActivityToActive {
    activeSystemsId: Array<number>,
}

export const setStarsActivityToActive = (params: SetStarsActivityToActive) => {
    const {
        activeSystemsId,
    } = params;

    activeSystemsId.forEach((systemId) => {
        //поиск активного элемента
        const system = document.querySelector<HTMLElement>(
            `[${DATA_SYSTEM_ID}="${systemId}"]`,
        );

        //если не был найден
        if (system === null) {
            return;
        }

        //спускаемся на несколько уровней ниже, что бы в нужном месте заменить модификатор
        const systemChild = system.querySelector('.star__orbit');

        //если не был найден
        if (systemChild === null) {
            return;
        }

        //заменяем модификатор
        systemChild.setAttribute(
            'class',
            'star__orbit star__orbit--activity-active',
        );
    });
};