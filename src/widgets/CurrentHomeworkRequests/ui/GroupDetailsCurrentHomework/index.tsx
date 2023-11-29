import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Card } from '@shared/ui/Card';
import React, { MouseEventHandler, useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';
import {
	GroupDetailsCurrentHomeworkProps
} from '@widgets/CurrentHomeworkRequests/ui/GroupDetailsCurrentHomework/interface';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';
import './styles.scss';

export const GroupDetailsCurrentHomework = ({
	content,
	onShowMoreClick,
	homeworkId,
	requests
}: GroupDetailsCurrentHomeworkProps) => {
	const [activeHomework, setActiveHomework] = useState(false);
	const [block, element] = bem('group-details-current-homework');
	
	const handleShowMoreClick: MouseEventHandler<HTMLButtonElement> = (e) => {
		e.stopPropagation();
		if (!onShowMoreClick) return;
		onShowMoreClick(homeworkId);
	};
	
	return (
		<CardGroupDetails
			active={activeHomework}
			setActive={setActiveHomework}
			title="Посмотреть запросы на проверку"
			size={cardSize.large}
			withOutShowMoreElement
			summary={
				<div className={element('summary')}>
					<div className={element('summary-content')}>
						<Typography variant={typographyVariant.regular14}>
							{content.length > 100 ? content.slice(0, 100) + '...' : content}
						</Typography>
					</div>
					
					<Button
						title={'Просмотреть'}
						size={buttonSize.small}
						onClick={handleShowMoreClick}
					/>
					
					<Button
						title={activeHomework ? 'Скрыть' : `Запросы:${requests.length}шт.`}
						size={buttonSize.small}
						color={buttonColor.filled}
					/>
				</div>
			}
			content={
				<div className={element('content')}>
					{requests.length !== 0 ?
						requests.map(({ explorer, requestId }) => (
							<Card key={requestId} size={cardSize.small}>
								<div>
									<Typography variant={typographyVariant.h2}>
										{getUserFullName(explorer)}
									</Typography>
								</div>
							</Card>
						
						)) : (
							<Card size={cardSize.small}>
								<Typography variant={typographyVariant.regular14}>
									Запросы отсутствуют
								</Typography>
							</Card>
						)
					}
					{}
				</div>
			}
		/>
	
	);
};