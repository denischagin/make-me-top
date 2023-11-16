import { ReactNode } from 'react';
import { CardInterface } from '@shared/ui/Card/interfaces';

export interface CardGroupDetailsProps extends Partial<Omit<CardInterface, 'content' | 'onClick'>> {
	active: boolean;
	setActive: (active: boolean) => void;
	summary: ReactNode;
	content: ReactNode;
	showMoreElement?: {
		showMoreElementActive: ReactNode
		showMoreElementInactive: ReactNode
	}
	title?: string;
}