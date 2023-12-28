import { ModalCreateFeedbackExplorerProps } from './interface';
import { useCreateExplorerFeedbackMutation } from '@entities/feedback';
import { ModalCreateFeedback, SubmitFeedbackArgsInterface } from '@features/create-feedback';

export const ModalCreateFeedbackExplorer = (props: ModalCreateFeedbackExplorerProps) => {
    const { onClose, explorerId } = props;

    const [createExplorerFeedback] = useCreateExplorerFeedbackMutation();

    const handleCreateExplorerRating = (args: SubmitFeedbackArgsInterface) => {
        createExplorerFeedback({
            explorerId: explorerId,
            ...args,
        })
            .unwrap()
            .then(onClose)
            .catch((error) => alert(JSON.stringify(error)));
    };

    return (
        <ModalCreateFeedback
            onSubmit={handleCreateExplorerRating}
            title={'Дайте оценку хранителю'}
            {...props}
        />
    );
};