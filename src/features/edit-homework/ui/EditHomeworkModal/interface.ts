import { ConfirmModalInterface } from '@shared/ui/ConfirmModal/interfaces';
import { ModalInterface } from '@shared/ui/CircleModal/interfaces';
import { HomeworkInterfaceHomework } from '@entities/homework/model/types/api';

export interface EditHomeworkModalProps extends Omit<ModalInterface, 'children' | 'header'> {
	currentHomework: HomeworkInterfaceHomework;
}