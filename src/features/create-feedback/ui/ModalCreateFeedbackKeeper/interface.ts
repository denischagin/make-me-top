import { ModalInterface } from '@shared/ui/Modal/interface';

export interface ModalCreateFeedbackKeeperProps extends Omit<ModalInterface, 'children'> {
    explorerId: number;
}