const colorModificationArray: Array<string> =
    ["orange-stroke-color","green-stroke-color","pink-stroke-color",];
let colorShelf: Array<string> = colorModificationArray.slice();

export const restoreColorShelf = (): void => {
    colorShelf = colorModificationArray.slice();
}
export const getColorFromShelf = (): string => {
    let colorModification = colorShelf.shift();

    if (colorModification === undefined) {
        colorModification = "white-stroke-color";
    }

    return colorModification;
}
