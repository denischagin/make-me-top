import { ReactNode } from 'react';

export interface ShowUserInfoProps extends ShowUserInfoContextInterface {
    children: ReactNode;
}

export interface ShowUserInfoContextInterface {
    phoneNumber?: string;
    email?: string;
    skype?: string;
    telegram?: string;
    handleOpenModal?: () => void;
    handleCloseModal?: () => void;
    isOpenModal?: boolean;
    fullname?: string;
}
