import { ReviewModalInterface } from '@shared/ui/Modal/interface';

export interface ModalCreateFeedbackExplorerProps extends Omit<ReviewModalInterface, "children">{
    explorerId: number
}