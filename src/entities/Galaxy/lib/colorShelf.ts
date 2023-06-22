//модификаторы, которые используются на "полке"
const colorModificationArray: Array<string> = [
  "orange-stroke-color",
  "green-stroke-color",
  "pink-stroke-color",
];

//полка
let colorShelf: Array<string> = colorModificationArray.slice();

//функция восстановнения "полки", полка
export const restoreColorShelf = (): void => {
  colorShelf = colorModificationArray.slice();
};

//функция получения значения с "полки", забирается и удаляется только первое значние
export const getColorFromShelf = (): string => {
  let colorModification = colorShelf.shift();

  //если все значения на полке были использованы
  if (colorModification === undefined) {
    colorModification = "white-stroke-color";
  }

  return colorModification;
};
