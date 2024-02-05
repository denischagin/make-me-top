import { ConfirmModalInterface } from '@shared/ui/ConfirmModal/interfaces';
import { CircleModalInterface } from '@shared/ui/CircleModal/interfaces';
import { HomeworkInterface } from '@entities/homework/model/types/api';

export interface EditHomeworkModalProps extends Omit<CircleModalInterface, 'children' | 'header'> {
    currentHomework: HomeworkInterface;
    isClosed?: boolean;
}