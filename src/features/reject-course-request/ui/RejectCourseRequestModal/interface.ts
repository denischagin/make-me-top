import { ModalInterface } from '@shared/ui/CircleModal/interfaces';

export interface RejectCourseRequestModalProps extends Pick<ModalInterface, 'isOpen' | 'onClose'> {
    requestId: number;
}