import { ConfirmModalInterface } from '@shared/ui/ConfirmModal/interfaces';
import { ModalInterface } from '@shared/ui/CircleModal/interfaces';
import { HomeworkInterface } from '@entities/homework/model/types/api';

export interface EditHomeworkModalProps extends Omit<ModalInterface, 'children' | 'header'> {
	currentHomework: HomeworkInterface;
}