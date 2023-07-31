import { ReactNode } from 'react';

import { SystemDependencyType } from '@entities/galaxy/model/types';

import { RequiredStarInterface } from '@shared/RequiredStarsList/interfaces';

export interface ModalAlertInterface {
    starStatus:  string;
    title?: string;
    dependencies?: Array<SystemDependencyType>,
    children?: ReactNode;
}

export enum ModalAlertVariants {
    choseKeeper = 'choseKeeper',
    needAnotherSystem = 'needAnotherSystem',
}
