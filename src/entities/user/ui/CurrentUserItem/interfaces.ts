import { roles } from '@shared/constants/storageKeys';

export interface CurrentUserItemInterface {
    personId: number;
    firstName: string;
    lastName: string;
    patronymic: string;
    rating: number;
    role: roles;
    badgeTitle: string;
}
