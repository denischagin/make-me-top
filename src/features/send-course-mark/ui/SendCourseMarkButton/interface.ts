import { ButtonInterface } from '@shared/ui/Button/interfaces';

export interface SendCourseMarkButtonProps extends Omit<ButtonInterface, "onClick">{
    explorerId: number;
    valueMark: number;
}