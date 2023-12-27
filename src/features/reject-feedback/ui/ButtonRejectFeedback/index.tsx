import { ButtonRejectFeedbackProps } from '@features/reject-feedback/ui/ButtonRejectFeedback/interface';
import { Button } from '@shared/ui/Button';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { useState } from 'react';

export const ButtonRejectFeedback = (props: ButtonRejectFeedbackProps) => {
    const {
        onSubmit,
        ...restProps
    } = props;

    const [isOpenModal, setIsOpenModal] = useState(false);

    const handleCloseModal = () => {
        setIsOpenModal(false);
    };

    const handleOpenModal = () => {
        setIsOpenModal(true);
    };


    const handleSubmitClick = () => {
        onSubmit();
        handleCloseModal();
    };

    return (
        <>
            <Button {...restProps} onClick={handleOpenModal} />

            <ConfirmModal
                onClose={handleCloseModal}
                isOpen={isOpenModal}
                confirmTitle='Вы уверены что хотите отклонить отзыв?'
                rejectButtonTitle='Нет, хочу оставить'
                submitButtonTitle='Да, хочу отклонить'
                onSubmit={handleSubmitClick}
            />
        </>
    );
};