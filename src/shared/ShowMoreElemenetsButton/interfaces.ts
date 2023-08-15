import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';

export interface ShowMoreElemenetsButtonInterface {
    setElementsLimit: (value: any) => void
    elementsLength: number | null | undefined
    defaultElementsLimit: number
    currentElementsLimit: number
    closeButtonTitle?: string
    openButtonTitle?: string
    buttonSize: buttonSize
    buttonColor?: buttonColor
}