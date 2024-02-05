import { ModalInterface } from '@shared/ui/Modal/interface';

export interface ModalCreateFeedbackCourseProps extends Omit<ModalInterface, 'children'> {
    explorerId: number

}