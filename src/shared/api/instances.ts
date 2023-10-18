import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { storageKeys } from '@shared/constants/storageKeys';
import { URL_MMT_STAND } from '@shared/constants/urls';
import { ErrorInterface } from '@shared/types/common';
import { AuthResponse } from '@entities/viewer/model/types/api';

export interface ErrorConfigWithRetry extends InternalAxiosRequestConfig {
    _isRetry: boolean;
}

export const getAccessToken = () => {
    const accessToken = localStorage.getItem(storageKeys.accessToken);

    return accessToken ?? null;
};

export const authInstance = axios.create({
    baseURL: URL_MMT_STAND,
    withCredentials: true,
});

export const commonInstance = axios.create({
    baseURL: URL_MMT_STAND,
    withCredentials: true,
});

authInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

authInstance.interceptors.response.use(
    (config) => config,
    async (error: AxiosError<ErrorInterface>) => {
        const originalRequest = error.config as ErrorConfigWithRetry;
        if (
            !originalRequest?._isRetry &&
            error.response &&
            error.response.status === 401
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get<AuthResponse>(
                    URL_MMT_STAND + 'refresh',
                );

                localStorage.setItem(
                    storageKeys.accessToken,
                    response.data.accessToken.accessToken,
                );
                localStorage.setItem(
                    storageKeys.refreshToken,
                    response.data.refreshToken.refreshToken,
                );

                return authInstance.request(originalRequest);
            } catch {
                localStorage.removeItem(storageKeys.accessToken);
                localStorage.removeItem(storageKeys.refreshToken);
            }
        }
    },
);
