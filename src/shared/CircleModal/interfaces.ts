import { ReactNode } from 'react';

import { UserProgress } from '@entities/user/model/types';

import { ILastChosenStar } from '@entities/galaxy/model/types';

import { ModalAlertVariants } from '@shared/ModalAlert/interfaces';
import { RequiredStarInterface } from '@shared/RequiredStarsList/interfaces';

export interface ModalInterface {
    header: string;
    isLocked?: boolean;
    data?: {
        lastChosenStar: ILastChosenStar,
        userProgress: UserProgress,
    };
    children: ReactNode;
    onClose: (dispatch: any) => any;
}

export interface ModalAlert {
    variant: ModalAlertVariants;
    systemList?: Array<RequiredStarInterface>;
}

export enum ModalAccessStatus {
    opened = 'Доступ открыт',
    closed_choseKeeper = 'Для изучения данной звезды, выберите хранителя и отправьте заявку',
    closed_needStars = 'Для изучения данной звезды, необходимы знания о звездах:',
}