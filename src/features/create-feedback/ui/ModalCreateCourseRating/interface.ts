import { ReviewModalInterface } from '@shared/ui/Modal/interface';

export interface ModalCreateFeedbackCourseProps extends Omit<ReviewModalInterface, 'children'> {
    explorerId: number

}