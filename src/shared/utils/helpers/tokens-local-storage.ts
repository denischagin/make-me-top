import { storageKeys } from '@shared/constants/storageKeys';

export interface TokensInterafce {
    accessToken?: string | null;
    refreshToken?: string | null;
}

export interface SetTokensToLocalStorageAgrs extends TokensInterafce {}
export interface GetTokensFromLocalStorageAgrs extends TokensInterafce {}

export const getTokensFromLocalStorage = (): GetTokensFromLocalStorageAgrs => {
    const accessToken = localStorage.getItem(storageKeys.accessToken);
    const refreshToken = localStorage.getItem(storageKeys.refreshToken);
    return { accessToken, refreshToken };
};

export const setTokensToLocalStorage = ({
    accessToken,
    refreshToken,
}: SetTokensToLocalStorageAgrs) => {
    if (!accessToken || !refreshToken) return;
    localStorage.setItem(storageKeys.accessToken, accessToken);
    localStorage.setItem(storageKeys.refreshToken, refreshToken);
};

export const removeTokensFromLocalStorage = () => {
    localStorage.removeItem(storageKeys.accessToken);
    localStorage.removeItem(storageKeys.refreshToken);
};
