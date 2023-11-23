import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { GroupDetailsOldHomework } from '@widgets/OldHomeworksRequest/ui/GroupDetailsOldHomework';

export const OldHomeworksRequest = () => {
	return (
		<div>
			<Typography variant={typographyVariant.h2}>
				Предыдущие задания
			</Typography>
			
			<GroupDetailsOldHomework />
		</div>
	);
};