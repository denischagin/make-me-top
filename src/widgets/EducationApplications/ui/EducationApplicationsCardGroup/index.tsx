import { EducationApplicationsCardGroupProps } from './interfaces';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { useState } from 'react';
import { EducationApplicationCard } from '@shared/ui/EducationApplicationCard';
import { CardGroupDetails } from '@shared/ui/CardGroupDetails';

export const EducationApplicationsCardGroup = (props: EducationApplicationsCardGroupProps) => {
	const { groupName, studyRequests } = props;
	const [isActive, setIsActive] = useState(false);
	
	return (
		<CardGroupDetails
			active={isActive}
			setActive={setIsActive}
			summary={
				<>
					<Typography variant={typographyVariant.h2}>
						{groupName}
					</Typography>
					<Typography variant={typographyVariant.regular16}>
						Количество заявок: {studyRequests.length}
					</Typography>
				</>
			}
			content={
				studyRequests.map((request) => (
					<EducationApplicationCard user={request} key={request.requestId} />
				))}
		/>
	);
};