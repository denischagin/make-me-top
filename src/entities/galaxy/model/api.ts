import toast from 'react-hot-toast';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AxiosError } from 'axios';

import { noAuthHandler } from '@shared/utils/helpers/noAuthHandler';

import { instance } from '@shared/api/instances';

import { URL_MMT_STAND } from '@shared/constants/urls';

import { ErrorInterface } from '@shared/types/common';

import { GalaxyForGetAll } from './types';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/error';
import { baseQueryWithAuth } from '@shared/api';

export const galaxiesApi = createApi({
    reducerPath: 'galaxiesApi',
    baseQuery: async (arg, api, extraOptions) => {
        return baseQueryWithAuth({ api, arg, extraOptions });
    },
    endpoints: (builder) => ({
        getAllGalaxies: builder.query<GalaxyForGetAll[], void>({
            query: () => ({
                url: 'galaxy-app/galaxies/',
                params: { detailed: true },
            }),
        }),
    }),
});

export const { useGetAllGalaxiesQuery } = galaxiesApi;
