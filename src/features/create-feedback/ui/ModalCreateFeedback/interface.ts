import { ReviewModalInterface } from '@shared/ui/Modal/interface';

export interface SubmitFeedbackArgsInterface {
    rating: number;
    comment: string;
}

export interface ModalCreateFeedbackProps extends Omit<ReviewModalInterface, 'children'> {
    onSubmit: (options: SubmitFeedbackArgsInterface) => void;
    title: string;
}