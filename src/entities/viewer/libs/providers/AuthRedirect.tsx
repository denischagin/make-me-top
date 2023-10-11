import { useRefreshMutation } from '@entities/viewer/model/api';
import { queryParams } from '@shared/constants';
import { URL_LOGIN, URL_PROFILE } from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';
import Spinner from '@shared/ui/Spinner';
import { useStatus } from '@shared/utils/hooks/use-status';
import React, { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export interface AuthRedirectProps {
    children: JSX.Element;
}

export const AuthRedirect = ({ children }: AuthRedirectProps) => {
    const [refreshMutation, { isSuccess, isError, data: tokens }] =
        useRefreshMutation();
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem(storageKeys.refreshToken)!;

        if (!refreshToken) return;

        refreshMutation(refreshToken);
    }, []);

    useStatus(() => {
        localStorage.setItem(
            storageKeys.accessToken,
            tokens?.accessToken.accessToken!,
        );
        localStorage.setItem(
            storageKeys.refreshToken,
            tokens?.refreshToken.refreshToken!,
        );
        // LOGIN
        navigate(URL_PROFILE, { replace: true });
    }, isSuccess);

    // useStatus(() => {
    //     navigate(
    //         `${URL_LOGIN}?${queryParams.redirect}=${encodeURIComponent(
    //             location.pathname,
    //         )}`,
    //         { replace: true },
    //     );
    // }, isError);

    if (isError) return children;

    return <Spinner loading />;
};
