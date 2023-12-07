import { EditHomeworkModalProps } from '@features/edit-homework/ui/EditHomeworkModal/interface';
import { Modal } from '@shared/ui/Modal';
import { ChangeEventHandler, useState } from 'react';
import { Typography } from '@shared/ui/Typography';
import { typographyColor, typographyVariant } from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils/helpers/bem';
import './styles.scss';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { useDeleteHomeworkMutation, useUpdateHomeworkMutation } from '@entities/homework/api/api';
import { EditingButtons } from '@features/edit-homework/ui/EditingButtons';
import { EditingContent } from '@features/edit-homework/ui/EditingContent';

export const EditHomeworkModal = (props: EditHomeworkModalProps) => {
    const { currentHomework, ...restProps } = props;
    const { content, homeworkId, courseThemeId, group: { groupId } } = currentHomework;

    const [updateHomework] = useUpdateHomeworkMutation();
    const [deleteHomework] = useDeleteHomeworkMutation();

    const [block, element] = bem('edit-homework-modal');
    const [editValue, setEditValue] = useState(content);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    const handleOpenConfirmDelete = () => setIsOpenConfirm(true);
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
            courseThemeId,
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
                            <EditingContent
                                isEditing={isEditing}
                                editValue={editValue}
                                content={content}
                                handleChangeEditField={handleChangeEditField}
                            />
                        </div>


                        <div className={element('editing-buttons')}>
                            <EditingButtons
                                isEditing={isEditing}
                                handleUpdateHomework={handleUpdateHomework}
                                handleCanselEditing={handleCanselEditing}
                                handleStartEditing={handleStartEditing}
                                handleOpenConfirmDelete={handleOpenConfirmDelete}
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