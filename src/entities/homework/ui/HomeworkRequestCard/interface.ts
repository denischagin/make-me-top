import { ReactNode } from 'react';

export enum homeworkRequestCardVariant {
	primary = 'primary',
	secondary = 'secondary',
}

export interface HomeworkRequestCardProps {
	username: string;
	content: string;
	variant?: homeworkRequestCardVariant;
	isActive?: boolean;
}