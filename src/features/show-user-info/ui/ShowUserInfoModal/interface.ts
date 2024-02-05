import { ModalInterface } from '@shared/ui/Modal/interface';

export interface ShowUserInfoModalProps extends Omit<ModalInterface, "isOpen" | "onClose" | "children"> {

}