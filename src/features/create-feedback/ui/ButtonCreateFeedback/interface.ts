import { ButtonInterface } from '@shared/ui/Button/interfaces';
import { ReactElement } from 'react';

export interface ButtonCreateFeedbackRenderProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface ButtonCreateFeedbackProps extends Partial<ButtonInterface> {
    renderModal: (options: ButtonCreateFeedbackRenderProps) => ReactElement;
}