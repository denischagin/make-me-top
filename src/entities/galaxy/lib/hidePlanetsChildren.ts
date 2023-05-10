interface IHidePlanetsChildrenProps {
    childrenList: string | null,
}

//функция изменения dataset атрбута для всех child зависимостей планеты
//(атрибут активности при наведении)
export const hidePlanetsChildren = (props: IHidePlanetsChildrenProps) => {
    const {
        childrenList
    } = props;

    const childrenListArray = childrenList!.split(",");

    childrenListArray.forEach(elementId => {
        if (elementId === '') {
            return;
        }

        const numberElementId = Number(elementId);

        const childElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);

        childElement?.setAttribute("data-is-active", "0");
    })
}
