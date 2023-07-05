import axios from 'axios';

import { storageKeys } from '@shared/constants/storageKeys';

export const authToken = () => {
    const token = localStorage.getItem(storageKeys.tokenAuth);

    return token ? JSON.parse(token) : null;
};

export const instance = axios.create();

instance.interceptors.request.use(
    config => {
        const token = authToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
);
