import { RefreshResponse } from '@entities/viewer/model/types';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQueryWithAuth } from '@shared/api';

export const viewerApi = createApi({
    reducerPath: 'viewerApi',
    baseQuery: async (arg, api, extraOptions) => {
        return baseQueryWithAuth({ api, arg, extraOptions });
    },
    endpoints: (builder) => ({
        refresh: builder.query<RefreshResponse, void>({
            query: () => 'refresh/',
        }),
    }),
});

export const { useRefreshQuery } = viewerApi;
