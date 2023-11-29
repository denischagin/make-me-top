import { EditHomeworkModalProps } from '@features/edit-homework/ui/EditHomeworkModal/interface';
import { Modal } from '@shared/ui/Modal';
import { ChangeEventHandler, useState } from 'react';
import { Textarea } from '@shared/ui/Textarea';
import { textareaColors, textareaSizes } from '@shared/ui/Textarea/interface';
import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { useDeleteHomeworkMutation, useUpdateHomeworkMutation } from '@entities/homework/api/api';
import { TypographyWithEnter } from '@shared/ui/TypographyWithEnter';

export const EditHomeworkModal = (props: EditHomeworkModalProps) => {
	const { currentHomework, ...restProps } = props;
	const { content, homeworkId, courseThemeId, group: { groupId } } = currentHomework;
	
	const [updateHomework, { isError: isErrorUpdate }] = useUpdateHomeworkMutation();
	const [deleteHomework, { isError: isErrorDelete }] = useDeleteHomeworkMutation();
	
	const [block, element] = bem('edit-homework-modal');
	const [editValue, setEditValue] = useState(content);
	const [isEditing, setIsEditing] = useState(false);
	const [isOpenConfirm, setIsOpenConfirm] = useState(false);
	
	const handleOpenConfirm = () => setIsOpenConfirm(true);
	const handleCloseConfirm = () => setIsOpenConfirm(false);
	
	const handleStartEditing = () => setIsEditing(true);
	const handleCanselEditing = () => {
		setIsEditing(false);
		setEditValue(content);
	};
	
	const handleSubmitDelete = () => {
		deleteHomework({ homeworkId });
	};
	
	const handleUpdateHomework = () => {
		if (content === editValue) return setIsEditing(false);
		
		updateHomework({
			content: editValue,
			homeworkId,
			groupId,
			courseThemeId
		});
		
		setIsEditing(false);
	};
	
	const handleChangeEditField: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		setEditValue(e.target.value);
	};
	
	return (
		<>
			<Modal fullwidth {...restProps} >
				<div className={block()}>
					<Typography
						variant={typographyVariant.h2}
						color={typographyColor.black}
					>
						Домашнее задание
					</Typography>
					
					<div className={element('modal-content')}>
						<div className={element('editing-homework')}>
							{isEditing ? (
								<Textarea
									color={textareaColors.white}
									value={editValue}
									size={content.length > 100 ? textareaSizes.large : textareaSizes.middle}
									onChange={handleChangeEditField}
									fullwidth
								/>
							) : (
								<TypographyWithEnter
									variant={typographyVariant.regular16}
									color={typographyColor.black}
								>
									{content}
								</TypographyWithEnter>
							)}
						</div>
						
						
						<div className={element('editing-buttons')}>
							{isEditing ? (
								<>
									<Button
										title={'Принять'}
										size={buttonSize.small}
										color={buttonColor.filled}
										onClick={handleUpdateHomework}
									/>
									
									<Button
										title={'Отменить'}
										size={buttonSize.small}
										color={buttonColor.primary500}
										onClick={handleCanselEditing}
									/>
								</>
							) : (
								<Button
									title={'Редактировать'}
									size={buttonSize.small}
									onClick={handleStartEditing}
									color={buttonColor.filled}
								/>
							)}
							
							<Button
								title={'Удалить'}
								size={buttonSize.small}
								color={buttonColor.black}
								onClick={handleOpenConfirm}
							/>
						</div>
					</div>
				</div>
			</Modal>
			
			<ConfirmModal
				confirmTitle={'Вы уверены что хотите удалить это домашнее задание?'}
				rejectButtonTitle={'Нет, не хочу удалить'}
				submitButtonTitle={'Да, хочу удалить'}
				onSubmit={handleSubmitDelete}
				onClose={handleCloseConfirm}
				isOpen={isOpenConfirm}
			/>
		</>
	);
};