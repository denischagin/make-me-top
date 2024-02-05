import { CircleModalInterface } from '@shared/ui/CircleModal/interfaces';
import { OptionInterface } from '@shared/ui/CustomSelect/interface';

export interface ModalSendHomeworkProps extends Omit<CircleModalInterface, 'header' | 'children'> {
    title: string;
    onSubmit?: (args: { title: string, content: string }) => void;
}