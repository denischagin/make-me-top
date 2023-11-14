import './styles.scss';
import { Modal } from '@shared/ui/Modal';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { ModalSendHomeworkProps } from '@entities/homework/ui/ModalSendHomework/interface';
import { bem } from '@shared/utils/helpers/bem';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { useState } from 'react';

export const ModalSendHomework = (props: ModalSendHomeworkProps) => {
	const { title, onSubmit, ...restProps } = props;
	const [block, element] = bem('modal-send-homework');
	
	const [homework, setHomework] = useState('');
	
	return (
		<Modal {...restProps}>
			<div className={block()}>
				<Typography
					variant={typographyVariant.h2}
					color={typographyColor.black}
				>
					{title}
				</Typography>
				
				<textarea
					className={element('homework-field')}
					cols={30}
					rows={10}
					value={homework}
					onChange={(e) => setHomework(e.target.value)}
				/>
				
				<Button
					title={'Окей'}
					size={buttonSize.small}
					color={buttonColor.filled}
					onClick={() => onSubmit && onSubmit(homework)}
				/>
			
			</div>
		
		</Modal>
	
	);
};