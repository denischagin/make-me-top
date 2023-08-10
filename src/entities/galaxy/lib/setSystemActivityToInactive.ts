import {
    INACTIVE_STAR_MODIFIER,
    STAR_CLASS,
} from '@entities/galaxy/model/constants';

interface SetSystemActivityToInactive {
    stars: NodeListOf<HTMLDivElement>;
}

//функция изменения модификаторов активности на "Не активный" всех систем галактики
export const setStarsActivityToInactive = (params: SetSystemActivityToInactive) => {
    const {
        stars,
    } = params;

    stars.forEach((star) => {
        star.setAttribute(
            'class',
            `${STAR_CLASS} ${INACTIVE_STAR_MODIFIER}`,
        );
    });
};