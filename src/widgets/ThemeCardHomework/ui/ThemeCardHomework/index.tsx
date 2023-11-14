import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyVariant } from '@shared/ui/Typography/interfaces';
import './styles.scss';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ModalSendHomework } from '@entities/homework';

export const ThemeCardHomework = () => {
	const [block, element] = bem('theme-card-homework');
	const { themeId } = useParams();
	
	const [isOpenModalHomework, setIsOpenModalHomework] = useState(false);
	
	const handleOnSubmitHomework = (homework: string) => {
		console.log(homework);
		setIsOpenModalHomework(false);
	};
	
	if (!themeId) return null;
	
	return (
		<>
			<div className={block()}>
				<Typography variant={typographyVariant.h2}>
					Домашнее задание
				</Typography>
				
				<Typography variant={typographyVariant.regular16}>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi cupiditate eaque,
					error ex magnam magni nostrum placeat porro possimus ratione soluta suscipit vitae
					voluptatem! Deleniti dolorem nisi optio perferendis tempora.
				</Typography>
				
				<Button
					className={element('button-homework')}
					title={'Ответить'}
					size={buttonSize.small}
					color={buttonColor.filled}
					onClick={() => setIsOpenModalHomework(true)}
				/>
			</div>
			
			<ModalSendHomework
				isOpen={isOpenModalHomework}
				onClose={() => setIsOpenModalHomework(false)}
				onSubmit={handleOnSubmitHomework}
				title="Введите домашнее задание"
			/>
		</>
	);
};