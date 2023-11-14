import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import {
	ApprovedEducationApplicationsGroupsSummaryProps
} from '@widgets/ApprovedEducationApplications/ui/ApprovedEducationApplicationsGroupSummary/interface';

export const ApprovedEducationApplicationsGroupSummary = ({
	courseTitle, courseRequestsCount, onStartEducation, active
}: ApprovedEducationApplicationsGroupsSummaryProps) => {
	const [block, element] = bem('approved-education-application-group');
	
	return (
		<div className={element('summary')}>
			<div>
				<Typography variant={typographyVariant.h2}>
					{courseTitle}
				</Typography>
				
				<Typography variant={typographyVariant.regular16}>
					Количество принятых заявок: {courseRequestsCount}
				</Typography>
			</div>
			
			
			<div className={element('summary-button', {
				active
			})}>
				<Button
					title="Начать обучение"
					onClick={onStartEducation}
					size={buttonSize.large}
					color={buttonColor.filled}
				/>
			</div>
		</div>
	);
};