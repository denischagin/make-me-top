import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import { Avatar } from '@shared/ui/Avatar';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import {
	HomeworkRequestCardProps,
	homeworkRequestCardVariant,
} from '@entities/homework/ui/HomeworkRequestCard/interface';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import './styles.scss';

export const HomeworkRequestCard =
	({
		username, content, variant = homeworkRequestCardVariant.primary,isActive
	}: HomeworkRequestCardProps) => {
		const [block, element] = bem('homework-request-card');
		
		return (
			<div className={block({
				variant,
			})}>
				<Avatar
					size={avatarSize.mediumSmall}
					isActive={isActive}
				/>
				
				<Card size={cardSize.medium}>
					<div className={element('card-content')}>
						<div>
							<Typography variant={typographyVariant.h2}>
								{username}
							</Typography>
							
							<Typography variant={typographyVariant.regular16}>
								{content}
							</Typography>
						</div>
					</div>
				</Card>
			</div>
		
		);
	};