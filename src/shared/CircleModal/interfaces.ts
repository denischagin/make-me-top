import { ReactNode } from 'react';

import { UserProgress } from '@entities/user/model/types';

import { LastChosenSystem } from '@entities/galaxy/model/types';

export interface ModalInterface {
    header: string;
    isLocked?: boolean;
    data?: {
        lastChosenStar: LastChosenSystem,
        userProgress: UserProgress,
    };
    children: ReactNode;
    onClose: (dispatch: any) => any;
}

export enum ModalAccessStatus {
    opened = 'Доступ открыт',
    closed_choseKeeper = 'Для изучения данной звезды, выберите хранителя и отправьте заявку',
    closed_needStars = 'Для изучения данной звезды, необходимы знания о звездах:',
}