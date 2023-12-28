import { Button } from '@shared/ui/Button';
import { ButtonCreateFeedbackProps } from './interface';
import { useState } from 'react';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';

export const ButtonCreateFeedback = (props: ButtonCreateFeedbackProps) => {
    const {
        renderModal,
        size = buttonSize.small,
        color = buttonColor.filled,
        title = 'Оставить отзыв',
        ...restProps
    } = props;

    const [isOpenModalFeedback, setIsOpenModalFeedback] =
        useState(false);

    const handleCloseModal = () => setIsOpenModalFeedback(false);
    const handleOpenModal = () => setIsOpenModalFeedback(true);

    return (
        <>
            <Button
                size={size}
                title={title}
                color={color}
                onClick={handleOpenModal}
                {...restProps}
            />

            {renderModal({ isOpen: isOpenModalFeedback, onClose: handleCloseModal })}
        </>
    );
};