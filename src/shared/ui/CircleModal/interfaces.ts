import { ReactNode } from 'react';

import {
    LastChosenSystem,
    UserProgressInGalaxy,
} from '@entities/galaxy/model/types';

export interface CircleModalInterface {
    isOpen: boolean;
    header: string;
    isLocked?: boolean;
    data?: {
        lastChosenSystem: LastChosenSystem,
        userProgress?: UserProgressInGalaxy,
    };
    children: ReactNode;
    onClose: () => void;
    handleChangeSystem?: (systemId: number) => void;
}

export enum ModalAccessStatus {
    opened = 'Доступ открыт',
    closed_choseKeeper = 'Для изучения данной системы, выберите хранителя и отправьте заявку',
    closed_needSystems = 'Для изучения данной системы, необходимы знания о системах:',
    closed_youInStuding = "Вы сейчас изучаете другую систему",
    closed_currentRequestAlreadyExists = "У вас уже есть активный запрос",
    closed_youAlreadyKeeper = "Вы являетесь хранителем на данной системе",
    studied_systemAlreadyDone = "Система уже пройдена"

}