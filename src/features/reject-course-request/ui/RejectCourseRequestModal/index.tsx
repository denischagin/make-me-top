import { ConfirmModal } from '@shared/ui/ConfirmModal';
import { CONFIRM_CANCEL_STUDYING_REQUEST } from '@shared/constants/modalTitles';
import { RejectCourseRequestModalProps } from '@features/reject-course-request/ui/RejectCourseRequestModal/interface';
import { useGetKeeperRejectionReasonsQuery, useRejectCourseRequestMutation } from '@entities/course';
import { useStatus } from '@shared/utils/hooks/use-status';
import toast from 'react-hot-toast';
import { TOAST_SUCCESS_REJECTED } from '@shared/constants/toasts';
import { bem } from '@shared/utils';
import './styles.scss';
import { ChangeEventHandler, useState } from 'react';

export const RejectCourseRequestModal = (props: RejectCourseRequestModalProps) => {
    const [, element] = bem('reject-course-request-modal');
    const [selectedReasonId, setSelectedReasonId] = useState<string | undefined>(undefined);

    const { requestId, onClose } = props;
    const [rejectCourse, { isSuccess: isSuccessReject }] =
        useRejectCourseRequestMutation();

    const { data: rejections } = useGetKeeperRejectionReasonsQuery();

    useStatus(() => {
        toast(TOAST_SUCCESS_REJECTED, {
            icon: '😔',
        });
        onClose();
    }, isSuccessReject);

    const handleSubmitRejectCourse = () => {
        if (!selectedReasonId)
            return toast.error('Выберите причину отказа');

        rejectCourse({
            requestId: requestId,
            reasonId: Number(selectedReasonId),
        });
    };

    const handleChangeReason: ChangeEventHandler<HTMLInputElement> = (e) => {
        setSelectedReasonId(e.currentTarget.id);
    };

    return (
        <ConfirmModal
            {...props}
            confirmTitle={CONFIRM_CANCEL_STUDYING_REQUEST}
            rejectButtonTitle='Нет, хочу продолжить'
            submitButtonTitle='Да, я уверен'
            confirmDescription={'Выберите причину отказа:'}
            onSubmit={handleSubmitRejectCourse}
        >
            <div className={element('rejections-list')}>
                {rejections?.map(({ reasonId, name }) => (
                    <div key={reasonId} className={element('rejections-item')}>
                        <input
                            type='radio'
                            name='reasons'
                            id={reasonId.toString()}
                            onChange={handleChangeReason}
                            checked={reasonId.toString() === selectedReasonId}
                        />
                        <label htmlFor={reasonId.toString()}>{name}</label>
                    </div>
                ))}
            </div>
        </ConfirmModal>
    );
};