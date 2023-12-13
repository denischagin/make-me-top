import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import {
	ApprovedEducationApplicationsGroupsSummaryProps,
} from '@widgets/ApprovedEducationApplications/ui/ApprovedEducationApplicationsGroupSummary/interface';

export const ApprovedEducationApplicationsGroupSummary = ({
	courseTitle, courseRequestsCount, onStartEducation, active, canStartEducation
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
				{ canStartEducation ? (
					<Button
						title="Начать обучение"
						onClick={onStartEducation}
						size={buttonSize.large}
						color={buttonColor.filled}
					/>
				) : (
					<Typography variant={typographyVariant.medium16}>
						Вы не можете начать обучение, у вас уже есть группа
					</Typography>
				)}
			</div>
		</div>
	);
};