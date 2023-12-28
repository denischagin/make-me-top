import { ReviewModalInterface } from '@shared/ui/Modal/interface';

export interface ModalCreateFeedbackKeeperProps extends Omit<ReviewModalInterface, 'children'> {
    explorerId: number;
}