import { DATA_SYSTEM_ID } from '@entities/orbit/model/types';

interface SetStarsActivity {
  stars: NodeListOf<HTMLDivElement>;
  activeSystemsId: Array<number>;
}

export const setStarsActivity = (params: SetStarsActivity) => {
    const {
        stars,
        activeSystemsId,
    } = params;

    //для каждой звезды:
    stars.forEach((planet) => {
    //если активных планет нет, то применяем модификатор inactive
        if (activeSystemsId.length === 0) {
            planet.setAttribute(
                'class',
                'star__orbit star__orbit--activity-inactive',
            );
        } else {
            //иначе проходимся по массиву с id всех активных планет и находим элементы по id-атрибуту
            activeSystemsId.forEach((planetId) => {
                const planet = document.querySelector<HTMLElement>(
                    `[${DATA_SYSTEM_ID}="${planetId}"]`,
                );

                //если не был найден
                if (planet === null) {
                    return;
                }

                //спускаемся на несколько уровней ниже, что бы в нужном месте заменить модификатор
                const planetChild = planet.querySelector('.star__orbit');

                //если не был найден
                if (planetChild === null) {
                    return;
                }

                //заменяем модификатор
                planetChild.setAttribute(
                    'class',
                    'star__orbit star__orbit--activity-active',
                );
            });
        }
    });
};
