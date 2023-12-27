import { ButtonInterface } from '@shared/ui/Button/interfaces';

export interface ButtonRejectFeedbackProps extends ButtonInterface {
    onSubmit: () => void;
}