import { ReactNode } from 'react';

import { SystemDependencyType } from '@entities/galaxy/model/types';

export interface ModalAlertInterface {
    starStatus: string;
    title?: string;
    dependencies?: Array<SystemDependencyType>,
    children?: ReactNode;
}
