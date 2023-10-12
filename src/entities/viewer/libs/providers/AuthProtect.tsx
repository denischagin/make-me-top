import { useEffect, useState } from 'react';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';

import { URL_LOGIN } from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';
import { queryParams } from '@shared/constants';
import { useRefreshMutation } from '@entities/viewer/model/api';
import { useStatus } from '@shared/utils/hooks/use-status';
import Spinner from '@shared/ui/Spinner';
import { UseAuthLoginData, useAuth } from '@entities/viewer/hooks/useAuth';
import { getNavigationPath } from '@entities/viewer/libs/helpers/getNavigationPath';

interface AuthProtectProps {
    children: JSX.Element;
}

const logout = (navigate: NavigateFunction, handleLogout: () => void) => {
    handleLogout();
    navigate(getNavigationPath(location.pathname), { replace: true });
};

export const AuthProtect = ({ children }: AuthProtectProps) => {
    const [refresh, { isSuccess, isError, data: tokens }] =
        useRefreshMutation();
    const { handleLogin, handleLogout, isAuth } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem(storageKeys.refreshToken)!;

        if (!refreshToken) return logout(navigate, handleLogout);
        if (isAuth) return;

        refresh(refreshToken);
    }, []);

    useStatus(() => {
        const loginData: UseAuthLoginData = {
            accessToken: tokens?.accessToken,
            refreshToken: tokens?.refreshToken,
            role: tokens?.role,
        };
        handleLogin(loginData);
    }, isSuccess);

    useStatus(() => {
        logout(navigate, handleLogout);
    }, isError);

    if (isSuccess || isAuth) return children;

    return <Spinner loading />;
};
