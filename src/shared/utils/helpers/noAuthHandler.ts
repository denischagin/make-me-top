import { AxiosError } from 'axios';
import { ErrorInterface } from '../../types/common';

export const noAuthHandler = (error: AxiosError<ErrorInterface>) => {
    if (error.response?.status === 401) return (window.location.href = '/');
};
