interface IHidePlanetsParents {
    parentsList: string | null
}
export const hidePlanetsParents = (props: IHidePlanetsParents) => {
    const {
        parentsList
    } = props;

    const parentsListArray = parentsList?.split(",");

    parentsListArray?.forEach(parent => {
        const elementData = parent.split(":");

        const [elementId, isAlternative] = elementData;
        const numberElementId = Number(elementId);

        if (isNaN(numberElementId)) {
            return
        }

        const parentElement = document.querySelector<HTMLElement>(`[data-planet-id="${numberElementId}"]`);
        const parentsListOfCurrentParent = parentElement!.getAttribute("data-planet-parent-list");

        parentElement?.setAttribute("data-is-active", "0");

        if (parentsListOfCurrentParent) {
            hidePlanetsParents({
                parentsList: parentsListOfCurrentParent,
            });
        }
    })
}