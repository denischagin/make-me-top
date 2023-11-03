import { EducationApplicationCard } from '@shared/ui/EducationApplicationCard';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { EducationApplicationsInterface } from './interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';
import { StudyRequestsGroupObject, StudyRequestsInterface } from '@entities/keeper/model/types/interfaces';
import { EducationApplicationsCardGroup } from '@widgets/EducationApplications';

export const EducationApplications = (
	props: EducationApplicationsInterface,
) => {
	const {
		applications,
	} = props;
	
	const [block, element] = bem('education-application');
	
	if (!applications?.length) {
		return null;
	}
	
	const applicationGroups = applications.reduce((acc, value) => {
		const { courseTitle } = value;
		return {
			...acc,
			[courseTitle]: [...(acc[courseTitle] || []), value]
		};
	}, {} as StudyRequestsGroupObject);
	
	const groupNames = Object.keys(applicationGroups);
	
	return (
		<div className={block()}>
			<Typography
				className={element('heading', 'mb-4')}
				variant={typographyVariant.h2}
			>
				Заявки на обучение
			</Typography>
			<div className={element('cards')}>
				{groupNames.length !== 0
					? groupNames.map((groupName) => (
						<EducationApplicationsCardGroup
							key={groupName}
							groupName={groupName}
							studyRequests={applicationGroups[groupName]} />
					)) : (
						<Typography variant={typographyVariant.medium16}>
							Заявки отсутствуют
						</Typography>)
				}
			</div>
		</div>
	);
};
