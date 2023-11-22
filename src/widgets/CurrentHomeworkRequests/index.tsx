import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import React, { useState } from 'react';
import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Card } from '@shared/ui/Card';
import { ModalSendHomework } from '@entities/homework';
import { useParams } from 'react-router-dom';
import './styles.scss'

export const CurrentHomeworkRequests = () => {
	const [block, element] = bem('current-homework-requests');
	const { themeId, courseId } = useParams();
	
	const [isOpenModalHomework, setIsOpenModalHomework] = useState(false);
	const handleOnSubmitHomework = (homework: string) => {
		console.log(homework);
		setIsOpenModalHomework(false);
	};
	
	if (!themeId) return null;
	
	const [activeHomework, setActiveHomework] = useState(false);
	
	return (
		<>
			<Button
				className={element('button-homework')}
				title={'Дать еще домашнее задание'}
				size={buttonSize.small}
				color={buttonColor.filled}
				onClick={() => setIsOpenModalHomework(true)}
			/>
			
			<div className={block()}>
				<Typography variant={typographyVariant.h2}>
					Текущие домашние задания и запросы на проверку
				</Typography>
				
				
				<CardGroupDetails
					active={activeHomework}
					setActive={setActiveHomework}
					title="Посмотреть запросы на проверку"
					size={cardSize.large}
					showMoreElement={{
						showMoreElementActive: <Button title={'Скрыть'} size={buttonSize.small}
						                               color={buttonColor.filled} />,
						showMoreElementInactive: <Button title={'Запросы: 2шт.'} style={{ minWidth: 'max-content' }}
						                                 size={buttonSize.small}
						                                 color={buttonColor.filled} />
					}}
					summary={
						<div className={element('summary-homework-request')}>
							<Typography variant={typographyVariant.regular14}>
								Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad animi blanditiis
								consectetur ducimus ea eaque est eveniet harum iste iure maiores omnis provident quidem,
								quis ut velit vero voluptatem.
							</Typography>
							<Button title={'Просмотреть'} size={buttonSize.small} />
						</div>}
					content={
						<>
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
						</>
					}
				/>
			</div>
			
			<ModalSendHomework
				isOpen={isOpenModalHomework}
				onClose={() => setIsOpenModalHomework(false)}
				onSubmit={handleOnSubmitHomework}
				title="Добавить домашнее задание"
			/>
		</>
	);
};