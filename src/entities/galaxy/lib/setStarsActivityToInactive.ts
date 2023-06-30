interface SetStarsActivityToInactive {
    stars: NodeListOf<HTMLDivElement>;
}

//функция изменения модификаторов активности на "Не активный" всех систем галактики
export const setStarsActivityToInactive = (params: SetStarsActivityToInactive) => {
    const {
        stars,
    } = params;

    stars.forEach((star) => {
        star.setAttribute(
            'class',
            'star__orbit star__orbit--activity-inactive',
        );
    });
};