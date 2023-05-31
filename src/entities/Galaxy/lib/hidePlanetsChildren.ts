import { DATA_PLANET_ID } from "@entities/Orbit/model/types";

interface IHidePlanetsChildren {
  childrenList: string | null;
}

//функция изменения dataset атрбута для всех child зависимостей планеты
//(атрибут активности при наведении)
export const hidePlanetsChildren = (params: IHidePlanetsChildren) => {
  const { childrenList } = params;

  const childrenListArray = childrenList!.split(",");

  childrenListArray.forEach((elementId) => {
    if (elementId === "") {
      return;
    }

    const numberElementId = Number(elementId);

    const childElement = document.querySelector<HTMLElement>(
      `[${DATA_PLANET_ID}="${numberElementId}"]`
    );

    childElement?.setAttribute("data-is-active", "0");
  });
};