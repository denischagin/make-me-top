import { login } from '@entities/viewer/model/slice';
import {
    LogoutResponse,
    RefreshParams,
    AuthResponse,
    AuthCredentials,
} from '@entities/viewer/model/types/api';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from '@shared/api';
import { storageKeys } from '@shared/constants/storageKeys';
import { URL_MMT_STAND } from '@shared/constants/urls';
import { setTokensToLocalStorage } from '@shared/utils/helpers/tokens-local-storage';

export const viewerApi = createApi({
    reducerPath: 'viewerApi',
    baseQuery,
    refetchOnMountOrArgChange: true,
    endpoints: (builder) => ({
        refresh: builder.mutation<AuthResponse, RefreshParams>({
            query: (body) => ({
                url: 'auth/refresh/',
                method: 'POST',
                body,
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    const { accessToken, refreshToken, role } = data;

                    dispatch(login({ accessToken, refreshToken, role }));
                    setTokensToLocalStorage({
                        accessToken: accessToken.accessToken,
                        refreshToken: refreshToken.refreshToken,
                    });
                } catch (error) {}
            },
        }),
        logout: builder.mutation<LogoutResponse, string>({
            query: (refreshToken) => ({
                url: 'auth/logout/',
                method: 'POST',
                body: refreshToken,
            }),
        }),
        login: builder.mutation<AuthResponse, AuthCredentials>({
            query: (credentials) => ({
                url: 'auth/login/',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useRefreshMutation, useLogoutMutation, useLoginMutation } =
    viewerApi;
