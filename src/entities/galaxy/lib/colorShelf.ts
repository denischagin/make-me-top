import {
    GREEN_STROKE_MOD,
    ORANGE_STROKE_MOD,
    PINK_STROKE_MOD,
    WHITE_STROKE_MOD,
} from '@shared/constants/colorModificators';

//модификаторы, которые используются на "полке"
const colorModificationArray: Array<string> = [
    ORANGE_STROKE_MOD,
    GREEN_STROKE_MOD,
    PINK_STROKE_MOD,
];

//полка
let colorShelf: Array<string> = colorModificationArray.slice();

//функция восстановнения "полки"
export const restoreColorShelf = (): void => {
    colorShelf = colorModificationArray.slice();
};

//функция получения значения с "полки",из массива забирается и удаляется только первое значние
export const getColorFromShelf = (): string => {
    let colorModification = colorShelf.shift();

    //если все значения на полке были использованы
    if (colorModification === undefined) {
        colorModification = WHITE_STROKE_MOD;
    }

    return colorModification;
};
