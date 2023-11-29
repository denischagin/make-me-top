import './styles.scss';
import { Modal } from '@shared/ui/Modal';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { ModalSendHomeworkProps } from '@entities/homework/ui/ModalSendHomework/interface';
import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { useEffect, useState } from 'react';
import { Textarea } from '@shared/ui/Textarea';
import { textareaColors } from '@shared/ui/Textarea/interface';

export const ModalSendHomework = (props: ModalSendHomeworkProps) => {
	const { title, onSubmit, ...restProps } = props;
	const [block, element] = bem('modal-send-homework');
	
	const [homeworkValue, setHomeworkValue] = useState('');
	
	return (
		<Modal {...restProps}>
			<div className={block()}>
				<Typography
					variant={typographyVariant.h2}
					color={typographyColor.black}
				>
					{title}
				</Typography>
				
				<Textarea
					value={homeworkValue}
					color={textareaColors.white}
					onChange={(e) => setHomeworkValue(e.target.value)}
				/>
				
				<Button
					title={'Окей'}
					size={buttonSize.small}
					color={buttonColor.filled}
					onClick={() => onSubmit && onSubmit(homeworkValue)}
				/>
			
			</div>
		
		</Modal>
	
	);
};