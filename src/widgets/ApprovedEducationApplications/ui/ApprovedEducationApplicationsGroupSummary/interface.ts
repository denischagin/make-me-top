import { MouseEventHandler } from 'react';

export interface ApprovedEducationApplicationsGroupsSummaryProps {
	courseTitle: string,
	courseRequestsCount: number,
	onStartEducation: MouseEventHandler<HTMLButtonElement>,
	canStartEducation: boolean
	isActive: boolean
}