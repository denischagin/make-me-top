import { CircleModalInterface } from '@shared/ui/CircleModal/interfaces';

export interface RejectCourseRequestModalProps extends Pick<CircleModalInterface, 'isOpen' | 'onClose'> {
    requestId: number;
}