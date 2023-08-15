import {
    Dispatch,
    SetStateAction,
} from 'react';

import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';

export interface ShowMoreElemenetsButtonInterface {
    setElementsLimit: Dispatch<SetStateAction<number>>
    elementsLength: number | null | undefined
    defaultElementsLimit: number
    currentElementsLimit: number
    closeButtonTitle?: string
    openButtonTitle?: string
    buttonSize: buttonSize
    buttonColor?: buttonColor
}