import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

import { storageKeys } from '@shared/constants/storageKeys';
import { URL_MMT_STAND } from '@shared/constants/urls';
import { ErrorInterface } from '@shared/types/common';

export interface ErrorConfigWithRetry extends InternalAxiosRequestConfig {
    _isRetry: boolean;
}

export const authToken = () => {
    const token = localStorage.getItem(storageKeys.tokenAuth);

    return token ? JSON.parse(token) : null;
};

export const instance = axios.create({
    baseURL: URL_MMT_STAND,
    withCredentials: true,
});

instance.interceptors.request.use((config) => {
    const token = authToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// instance.interceptors.response.use(
//     (config) => config,
//     async (error: AxiosError<ErrorInterface>) => {
//         const originalRequest = error.config as ErrorConfigWithRetry;
//         if (
//             !originalRequest?._isRetry &&
//             error.response &&
//             error.response.status === 401
//         ) {
//             originalRequest._isRetry = true;
//             try {
//                 const response = await axios.get<any>(URL_MMT_STAND + 'refresh');
                
//                 localStorage.setItem(
//                     storageKeys.tokenAuth,
//                     JSON.stringify(response.data.accessToken),
//                 );
                
//                 return instance.request(originalRequest);
//             } catch {
//                 localStorage.removeItem(storageKeys.tokenAuth);
//             }
//         }
//     },
// );
