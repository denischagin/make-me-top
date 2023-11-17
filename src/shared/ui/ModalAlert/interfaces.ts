import { ReactNode } from 'react';

import { SystemDependencyType } from '@entities/galaxy/model/types';
import { ModalAccessStatus } from '@shared/ui/CircleModal/interfaces';

export interface ModalAlertInterface {
	title?: ModalAccessStatus;
	dependencies?: Array<SystemDependencyType>,
	handleChangeSystem?: (systemId: number) => void;
	isExplorer?: boolean
	onClickShow?: () => void
}
