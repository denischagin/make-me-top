import { ReactNode } from 'react';

import {
    LastChosenSystem,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

export interface ModalInterface {
    isOpen: boolean;
    header: string;
    isLocked?: boolean;
    data?: {
        lastChosenSystem: LastChosenSystem,
        userProgress: UserProgressInGalaxy,
    };
    children: ReactNode;
    onClose: () => void;
    handleChangeSystem?: (systemId: number) => void;
}

export enum ModalAccessStatus {
    opened = 'Доступ открыт',
    closed_choseKeeper = 'Для изучения данной системы, выберите хранителя и отправьте заявку',
    closed_needSystems = 'Для изучения данной системы, необходимы знания о системах:',
}