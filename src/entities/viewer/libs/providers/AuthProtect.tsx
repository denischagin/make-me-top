import { useEffect, useState } from 'react';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';

import { URL_LOGIN } from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';
import { queryParams } from '@shared/constants';
import { useRefreshMutation } from '@entities/viewer/model/api';
import { useStatus } from '@shared/utils/hooks/use-status';
import Spinner from '@shared/ui/Spinner';

interface AuthProtectProps {
    children: JSX.Element;
}

const handleLogout = (navigate: NavigateFunction) => {
    localStorage.removeItem(storageKeys.accessToken);
    localStorage.removeItem(storageKeys.refreshToken);
    navigate(
        `${URL_LOGIN}?${queryParams.redirect}=${encodeURIComponent(
            location.pathname,
        )}`,
        { replace: true },
    );
};

export const AuthProtect = ({ children }: AuthProtectProps) => {
    const [refresh, { isSuccess, isError, data: tokens }] =
        useRefreshMutation();
    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem(storageKeys.refreshToken)!;

        if (!refreshToken) return handleLogout(navigate);

        refresh(refreshToken);
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
    }, isSuccess);

    useStatus(() => {
        handleLogout(navigate)
    }, isError);

    if (isSuccess) return children;

    return <Spinner loading />;
};
