import { ReactNode } from 'react';

export interface CardGroupDetailsProps {
	active: boolean;
	setActive: (active: boolean) => void;
	summary: ReactNode;
	content: ReactNode;
}