import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import { Card } from '@shared/ui/Card';
import React, { useState } from 'react';
import { bem } from '@shared/utils/helpers/bem';

export const GroupDetailsCurrentHomework = () => {
	const [activeHomework, setActiveHomework] = useState(false);
	const [block, element] = bem('group-details-current-homework');
	
	return (
		<CardGroupDetails
			active={activeHomework}
			setActive={setActiveHomework}
			title="Посмотреть запросы на проверку"
			size={cardSize.large}
			showMoreElement={{
				showMoreElementActive: <Button title={'Скрыть'} size={buttonSize.small}
				                               color={buttonColor.filled} />,
				showMoreElementInactive: <Button title={'Запросы: 2шт.'}
				                                 size={buttonSize.small}
				                                 color={buttonColor.filled} />
			}}
			summary={
				<div className={element('summary')}>
					<Typography variant={typographyVariant.regular14}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad animi blanditiis
						consectetur ducimus ea eaque est eveniet harum iste iure maiores omnis provident quidem,
						quis ut velit vero voluptatem.
					</Typography>
					<Button title={'Просмотреть'} size={buttonSize.small} />
				</div>}
			content={
				<div className={element('content')}>
					<Card size={cardSize.small}>
						<div>
							<Typography variant={typographyVariant.h2}>
								Какой то чел
							</Typography>
							
							<Typography variant={typographyVariant.regular16}>
								Запрос на проверку
								{'https://github.com/adsfasd'}
							</Typography>
						</div>
					</Card>
					<Card size={cardSize.small}>
						<div>
							<Typography variant={typographyVariant.h2}>
								Чел обычный просто
							</Typography>
							
							<Typography variant={typographyVariant.regular16}>
								{'https://github.com/denischagin хороший репозиторий и паттерны классные, мне всё понравилось'}
							</Typography>
						</div>
					</Card>
				</div>
			}
		/>
	
	);
};