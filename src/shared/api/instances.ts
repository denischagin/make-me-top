import axios from 'axios';

import { storageKeys } from '@shared/constants/storageKeys';
import { URL_MMT_STAND } from '@shared/constants/urls';

export const authToken = () => {
    const token = localStorage.getItem(storageKeys.tokenAuth);

    return token ? JSON.parse(token) : null;
};

export const instance = axios.create({
    baseURL: URL_MMT_STAND
});

instance.interceptors.request.use(
    config => {
        const token = authToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
);

