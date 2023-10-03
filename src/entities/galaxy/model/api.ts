import toast from 'react-hot-toast';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { DEFAULT_ERROR_MESSAGE } from './constants';
import { GalaxyForGetAll } from './types';
import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

export const galaxiesApi = createApi({
    reducerPath: 'galaxiesApi',
    baseQuery: async (arg, api, extraOptions) => {
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
            toast.error(error.message || DEFAULT_ERROR_MESSAGE);

            return {
                error,
            };
        }
    },
    endpoints: (builder) => ({
        getAllGalaxies: builder.query<GalaxyForGetAll[], void>({
            query: () => 'galaxy-app/galaxy/',
        }),
    }),
});

export const { useGetAllGalaxiesQuery } = galaxiesApi;
