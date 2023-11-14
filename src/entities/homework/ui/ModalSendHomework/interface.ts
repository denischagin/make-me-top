import { ModalInterface } from '@shared/ui/CircleModal/interfaces';
import { OptionInterface } from '@shared/ui/CustomSelect/interface';

export interface ModalSendHomeworkProps extends Omit<ModalInterface, 'header' | 'children'> {
	title: string;
	onSubmit?: (homework: string) => void
}