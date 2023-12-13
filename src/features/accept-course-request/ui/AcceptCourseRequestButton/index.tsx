import { Button } from '@shared/ui/Button';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { useAcceptCourseRequestMutation } from '@entities/course';
import { useState } from 'react';
import { useStatus } from '@shared/utils/hooks/use-status';
import toast from 'react-hot-toast';
import { TOAST_SUCCESS_APPROVED } from '@shared/constants/toastTitles';
import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { AcceptCourseRequestButtonProps } from './interface';

export const AcceptCourseRequestButton = ({ requestId }: AcceptCourseRequestButtonProps) => {
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);

    const [acceptCourse, { isSuccess: isSuccessAccept }] =
        useAcceptCourseRequestMutation();

    const handleAcceptCourse = () => {
        acceptCourse({
            requestId,
        });
        setIsAcceptModalOpen(false);
    };

    useStatus(() => {
        toast(TOAST_SUCCESS_APPROVED, {
            icon: '🤩',
        });
    }, isSuccessAccept);

    return (
        <>
            <Button title={'Принять'} size={buttonSize.large} color={buttonColor.filled} onClick={() => setIsAcceptModalOpen(true)}/>
            <ConfirmModal
                isOpen={isAcceptModalOpen}
                confirmTitle='Вы уверены, что хотите принять запрос на обучение?'
                onClose={() => setIsAcceptModalOpen(false)}
                onSubmit={handleAcceptCourse}
                rejectButtonTitle='Нет'
                submitButtonTitle='Да, я хочу принять'
            />
        </>
    );
};