import { ReactNode } from 'react';

import {
    LastChosenSystem,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

export interface ModalInterface {
    header: string;
    isLocked?: boolean;
    data?: {
        lastChosenStar: LastChosenSystem,
        userProgress: UserProgressInGalaxy,
    };
    children: ReactNode;
    onClose: () => void;
}

export enum ModalAccessStatus {
    opened = 'Доступ открыт',
    closed_choseKeeper = 'Для изучения данной системы, выберите хранителя и отправьте заявку',
    closed_needStars = 'Для изучения данной системы, необходимы знания о системах:',
}