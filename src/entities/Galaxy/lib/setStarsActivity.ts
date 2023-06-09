import { DATA_PLANET_ID } from "@entities/Orbit/model/types";

interface SetStarsActivity {
  planetsChild: NodeListOf<HTMLDivElement>;
  activePlanetsId: Array<number>;
}

export const setStarsActivity = (params: SetStarsActivity) => {
  const { planetsChild, activePlanetsId } = params;

  //для каждой звезды:
  planetsChild.forEach((planet) => {
    //если активных планет нет, то применяем модификатор inactive
    if (activePlanetsId.length === 0) {
      planet.setAttribute(
        "class",
        "star__orbit star__orbit--activity-inactive"
      );
    } else {
      //иначе проходимся по массиву с id всех активных планет и находим элементы по id-атрибуту
      activePlanetsId.forEach((planetId) => {
        const planet = document.querySelector<HTMLElement>(
          `[${DATA_PLANET_ID}="${planetId}"]`
        );

        //если не был найден
        if (planet === null) {
          return;
        }

        //спускаемся на несколько уровней ниже, что бы в нужном месте заменить модификатор
        const planetChild = planet.querySelector(".star__orbit");

        //если не был найден
        if (planetChild === null) {
          return;
        }

        //заменяем модификатор
        planetChild.setAttribute(
          "class",
          "star__orbit star__orbit--activity-active"
        );
      });
    }
  });
};
