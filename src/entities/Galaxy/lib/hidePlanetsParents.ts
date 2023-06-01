import {
  DATA_PLANET_ID,
  DATA_PLANET_PARENT_LIST,
} from "@entities/Orbit/model/types";

interface IHidePlanetsParents {
  parentsList: string | null;
}

//рекурсивная функция изменения dataset атрбута для всех parent зависимостей планеты
//атрибут будет изменен у всех зависимых элементов вплоть до крайнего parent элемента без зависимостей
//(атрибут активности при наведении)
export const hidePlanetsParents = (params: IHidePlanetsParents) => {
  const { parentsList } = params;

  //преобразование строки в массив формата ["КодПланеты:ТипСвязи",...]
  const parentsListArray = parentsList?.split(",");

  parentsListArray?.forEach((parent) => {
    //преобразование строки в массив формата [КодПланеты, ТипСвязи]
    const elementData = parent.split(":");

    const [elementId, isAlternative] = elementData;
    const numberElementId = Number(elementId);

    if (isNaN(numberElementId)) {
      return;
    }

    //массив parent зависимостей текущего parent элемента
    const parentElement = document.querySelector<HTMLElement>(
      `[${DATA_PLANET_ID}="${numberElementId}"]`
    );
    const parentsListOfCurrentParent = parentElement?.getAttribute(
      DATA_PLANET_PARENT_LIST
    );

    // //изменение атрибута
    // parentElement?.setAttribute("data-is-active", "0");

    //если у текущего parent элемента есть parent зависимости
    if (parentsListOfCurrentParent) {
      hidePlanetsParents({
        parentsList: parentsListOfCurrentParent,
      });
    }
  });
};