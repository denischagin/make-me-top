import { ReactNode, useEffect, useState } from 'react';
import { Navigate, NavigateFunction, useNavigate } from 'react-router-dom';

import { URL_LOGIN } from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';
import { searchParamKeys } from '@shared/constants';
import { useRefreshMutation } from '@entities/viewer/api/api';
import { useStatus } from '@shared/utils/hooks/use-status';
import Spinner from '@shared/ui/Spinner';
import { UseAuthLoginData, useAuth } from '@entities/viewer/libs/hooks/useAuth';
import { getNavigationPath } from '@entities/viewer/libs/helpers/getNavigationPath';

interface AuthProtectProps {
    children: JSX.Element;
}

const logout = (navigate: NavigateFunction, handleLogout: () => void) => {
    handleLogout();
    navigate(getNavigationPath(location.pathname), { replace: true });
};

export const AuthProtect = ({ children }: { children: JSX.Element}) => {
	
    const [refresh, { isSuccess, isError, data: tokens }] =
        useRefreshMutation();
    const { handleLogout, isAuth } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem(storageKeys.refreshToken)!;

        if (!refreshToken) return logout(navigate, handleLogout);
        if (isAuth) return;

        refresh(refreshToken);
    }, []);

    useStatus(() => {
        logout(navigate, handleLogout);
    }, isError);

    if (isSuccess || isAuth) return children;

    return <Spinner loading />;
};
