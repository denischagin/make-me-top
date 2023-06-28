interface SetStarsActivityToInactive {
    stars: NodeListOf<HTMLDivElement>;
}

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