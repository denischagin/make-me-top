//массив css модификаторов
const colorModificationArray: Array<string> = [
  "blue-stroke-color",
  "orange-stroke-color",
];
//скопированный массив: полка с которой очередно будут снимать цвета
let colorShelf: Array<string> = colorModificationArray.slice();

//метод восстановления скопированного массива
//используется при удалении всех линий
export const restoreColorShelf = (): void => {
  colorShelf = colorModificationArray.slice();
};

//метод, возвращающий последний модификатор и удаляющий его из скопированного массива
//позволяет последовательно получать элементы не используя индексы или поиск по совпадению
export const getColorFromShelf = (): string => {
  let colorModification = colorShelf.shift();

  //если все цвета были использованы будет использоватся модификатор с белым цветом
  if (colorModification === undefined) {
    colorModification = "white-stroke-color";
  }

  return colorModification;
};
