import { ModalCreateFeedbackKeeperProps } from './interface';
import { useCreateKeeperFeedbackMutation } from '@entities/feedback';
import { SubmitFeedbackArgsInterface } from '@features/create-feedback';
import { ModalCreateFeedback } from '../ModalCreateFeedback';
import { onErrorHandling } from '@shared/api';

export const ModalCreateFeedbackKeeper = (props: ModalCreateFeedbackKeeperProps) => {
    const { onClose, explorerId } = props;

    const [createKeeperFeedback] = useCreateKeeperFeedbackMutation();

    const handleCreateCourseRating = (args: SubmitFeedbackArgsInterface) => {
        createKeeperFeedback({
            explorerId: explorerId,
            ...args,
        })
            .unwrap()
            .then(onClose)
            .catch(() => {})
    };

    return (
        <ModalCreateFeedback
            onSubmit={handleCreateCourseRating}
            title={'Дайте оценку исследователю'}
            {...props}
        />
    );
};