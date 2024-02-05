import { ModalInterface } from '@shared/ui/Modal/interface';

export interface ModalCreateFeedbackExplorerProps extends Omit<ModalInterface, "children">{
    explorerId: number
}