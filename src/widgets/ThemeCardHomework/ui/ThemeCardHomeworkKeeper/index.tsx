import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import './styles.scss';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ModalSendHomework } from '@entities/homework';
import { CardGroupDetails } from '@shared/ui/CardGroupDetails';
import { Card } from '@shared/ui/Card';
import { cardSize } from '@shared/ui/Card/interfaces';
import { Button } from '@shared/ui/Button';

export const ThemeCardHomeworkKeeper = () => {
		const [block, element] = bem('theme-card-homework');
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
				<div className={block()}>
					<Typography variant={typographyVariant.h2}>
						Домашние задания и запросы на проверку
					</Typography>
					
					
					<CardGroupDetails
						active={activeHomework}
						setActive={setActiveHomework}
						title="Посмотреть запросы на проверку"
						size={cardSize.large}
						showMoreElement={{
							showMoreElementActive: <Button size={buttonSize.small} title="Скрыть" />,
							showMoreElementInactive: <Button size={buttonSize.small} title={`Запросы`} />
						}}
						summary={
							<>
								<Typography variant={typographyVariant.h2}>
									Запросов на проверку: 2
								</Typography>
								
								<Typography variant={typographyVariant.regular14}>
									Сделать взаимодействие с DOM деревом
								</Typography>
							</>}
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
					
					<Button
						className={element('button-homework')}
						title={'Дать еще домашнее задание'}
						size={buttonSize.small}
						color={buttonColor.filled}
						onClick={() => setIsOpenModalHomework(true)}
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
	}
;