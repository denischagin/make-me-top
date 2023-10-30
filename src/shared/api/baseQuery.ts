import { login, logout } from '@entities/viewer/model/slice';
import { AuthResponse } from '@entities/viewer/model/types/api';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { DEFAULT_ERROR_MESSAGE } from '@shared/constants/error';
import { URL_MMT_STAND } from '@shared/constants/urls';
import { ErrorInterface } from '@shared/types/common';
import {
    getTokensFromLocalStorage,
    removeTokensFromLocalStorage,
    setTokensToLocalStorage,
} from '@shared/utils/helpers/tokens-local-storage';
import toast from 'react-hot-toast';
import { Mutex } from 'async-mutex';
import { URL_LOGIN } from '@shared/constants/links';

const mutex = new Mutex();

export const baseQuery = fetchBaseQuery({ baseUrl: URL_MMT_STAND });

export interface BaseQueryWithToastsExtraOption {
    withToasts?: boolean;
}

export const baseQueryWithToasts: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions: BaseQueryWithToastsExtraOption) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error && extraOptions.withToasts) onErrorHandling(result.error);
    return result;
};

export const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions: any) => {
    await mutex.waitForUnlock();
    const { refreshToken, accessToken } = getTokensFromLocalStorage();

    let argsWithHeader = getArgsWithHeader(args, accessToken);
    let result = await baseQuery(argsWithHeader, api, extraOptions);

    if (result.error && result.error.status !== 401)
        onErrorHandling(result.error, extraOptions);

    if (result.error && result.error.status === 401) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: 'auth/refresh',
                        method: 'POST',
                        body: refreshToken,
                    },
                    api,
                    extraOptions,
                );
                if (refreshResult.data) {
                    const refreshResultData =
                        refreshResult.data as AuthResponse;
                    const { refreshToken, accessToken } = refreshResultData;

                    const argsWithHeader = getArgsWithHeader(
                        args,
                        accessToken.accessToken,
                    );

                    result = await baseQuery(argsWithHeader, api, extraOptions);

                    api.dispatch(login(refreshResultData));
                    setTokensToLocalStorage({
                        accessToken: accessToken.accessToken,
                        refreshToken: refreshToken.refreshToken,
                    });
                } else {
                    api.dispatch(logout());
                    removeTokensFromLocalStorage();
                    location.href = URL_LOGIN;
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            const { accessToken } = getTokensFromLocalStorage();
            argsWithHeader = getArgsWithHeader(args, accessToken);
            result = await baseQuery(argsWithHeader, api, extraOptions);
        }
    }
    return result;
};

const onErrorHandling = (
    err: unknown,
    extraOptions?: { withOutToasts: boolean },
) => {
    const error = err as FetchBaseQueryError;

    if (extraOptions && extraOptions.withOutToasts === true) return;

    if (error.data) {
        const errorData = error.data as ErrorInterface;
        toast.error(errorData.errorMessage);

        return;
    }
    toast.error(DEFAULT_ERROR_MESSAGE);
};

const getArgsWithHeader = (
    args: string | FetchArgs,
    accessToken?: string | null,
): FetchArgs => {
    const headers = {
        Authorization: `Bearer ${accessToken}`,
    };

    if (typeof args === 'string') return { url: args, headers };
    else return { ...args, headers };
};
