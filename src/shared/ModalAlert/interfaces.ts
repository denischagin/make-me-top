import { ReactNode } from 'react';

import { SystemDependencyType } from '@entities/galaxy/model/types';

export interface ModalAlertInterface {
    title: string;
    dependencies?: Array<SystemDependencyType>,
    children?: ReactNode;
}
