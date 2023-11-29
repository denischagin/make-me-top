import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { useState } from 'react';
import { GroupDetailsOldHomeworkProps } from '@widgets/OldHomeworksRequest/ui/GroupDetailsOldHomework/interface';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

export const GroupDetailsOldHomework = ({ requests, content, explorers }: GroupDetailsOldHomeworkProps) => {
	const [active, setActive] = useState(false);
	
	const explorersString =
		explorers.map((explorer) => getUserFullName(explorer)).join(', ');
	
	return (
		<CardGroupDetails
			active={active}
			setActive={setActive}
			summary={
				<div>
					<Typography variant={typographyVariant.h2}>
						{explorersString}
					</Typography>
					<Typography variant={typographyVariant.regular16}>
						{content}
					</Typography>
				</div>
			}
			content={
				<div>
					{requests.map(({ requestId, explorer, status }) => (
						<Card key={requestId} size={cardSize.small}>
							<Typography variant={typographyVariant.h2}>
								{getUserFullName(explorer)} {status.status}
							</Typography>
						</Card>
					))}
				</div>
			}
		/>
	);
};