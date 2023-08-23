import {
    INACTIVE_SYSTEM_MODIFIER,
    SYSTEM_CLASS,
} from '@entities/galaxy/model/constants';

interface SetSystemActivityToInactive {
    stars: NodeListOf<HTMLDivElement>;
}

//функция изменения модификаторов активности на "Не активный" всех систем галактики
export const setSystemsActivityToInactive = (params: SetSystemActivityToInactive) => {
    const {
        stars,
    } = params;

    stars.forEach((star) => {
        star.setAttribute(
            'class',
            `${SYSTEM_CLASS} ${INACTIVE_SYSTEM_MODIFIER}`,
        );
    });
};