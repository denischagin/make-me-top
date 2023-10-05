import { roles, storageKeys } from '@shared/constants/storageKeys';

export const getRoleFromLocalStorage = (): roles | null => {
    return localStorage.getItem(storageKeys.currentRole) as roles;
};
