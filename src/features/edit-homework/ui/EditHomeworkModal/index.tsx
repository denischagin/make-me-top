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
    const { content, homeworkId, courseThemeId, title, group: { groupId } } = currentHomework;

    const [updateHomework] = useUpdateHomeworkMutation();
    const [deleteHomework] = useDeleteHomeworkMutation();

    const [block, element] = bem('edit-homework-modal');
    const [editContent, setEditContent] = useState(content);
    const [editTitle, setEditTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);
    const [isOpenConfirm, setIsOpenConfirm] = useState(false);

    const handleOpenConfirmDelete = () => setIsOpenConfirm(true);
    const handleCloseConfirm = () => setIsOpenConfirm(false);

    const handleStartEditing = () => setIsEditing(true);
    const handleCanselEditing = () => {
        setIsEditing(false);
        setEditTitle(title);
        setEditContent(content);
    };

    const handleSubmitDelete = () => {
        deleteHomework({ homeworkId });
    };

    const handleUpdateHomework = () => {
        if (content === editContent && title === editTitle) return setIsEditing(false);

        updateHomework({
            title: editTitle,
            content: editContent,
            homeworkId,
            groupId,
            courseThemeId,
        });

        setIsEditing(false);
    };

    const handleChangeTitleField: ChangeEventHandler<HTMLInputElement> = (e) => {
        setEditTitle(e.target.value);
    };
    const handleChangeContentField: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        setEditContent(e.target.value);
    };

    return (
        <>
            <Modal fullwidth {...restProps} >
                <div className={block()}>
                    <Typography
                        variant={typographyVariant.h1}
                        color={typographyColor.black}
                    >
                        Домашнее задание
                    </Typography>

                    <div className={element('modal-content')}>
                        <div className={element('editing-homework')}>
                            <EditingContent
                                isEditing={isEditing}
                                editContent={editContent}
                                editTitle={editTitle}
                                content={content}
                                title={title}
                                handleChangeContentField={handleChangeContentField}
                                handleChangeTitleField={handleChangeTitleField}
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