import { BaseQueryApi } from '@reduxjs/toolkit/dist/query';
import { instance } from '@shared/api/instances';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/error';
import { ErrorInterface } from '@shared/types/common';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

export interface BaseQueryArgs {
    arg: any;
    api: BaseQueryApi;
    extraOptions: {};
}

export const baseQueryWithAuth = async ({ api, arg, extraOptions }: BaseQueryArgs) => {
    try {
        const response = await instance(arg, extraOptions);

        return {
            data: response.data,
        };
    } catch (err) {
        const error: AxiosError<ErrorInterface> = err as any;

        // noAuthHandler(error);

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
