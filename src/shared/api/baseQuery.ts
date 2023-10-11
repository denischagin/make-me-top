import { BaseQueryApi } from '@reduxjs/toolkit/dist/query';
import { instance } from '@shared/api/instances';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/error';
import { ErrorInterface } from '@shared/types/common';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { arch } from 'os';
import toast from 'react-hot-toast';

export interface BaseQueryArgs {
    arg: AxiosRequestConfig<any>;
    api?: BaseQueryApi;
    extraOptions?: object;
}

const baseQuery = async ({ arg }: BaseQueryArgs) => {
    try {
        return await instance(arg);
    } catch (err) {
        const error: AxiosError<ErrorInterface> = err as any;

        if (error.response) {
            toast.error(error.response.data.errorMessage);

            return {
                error,
            };
        }
        toast.error(DEFAULT_ERROR_MESSAGE);

        return {
            error,
        };
    }
};

export const baseQueryWithAuth = async (arg: AxiosRequestConfig) => {
    return baseQuery({ arg });
};
