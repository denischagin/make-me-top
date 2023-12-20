import { ButtonInterface } from '@shared/ui/Button/interfaces';

export interface CardDetailsButtonProps extends Omit<ButtonInterface, 'title'> {
    isActive: boolean;
    activeTitle: string;
    inactiveTitle: string;
}