import { useAuth } from '@entities/viewer/hooks/useAuth';
import { useRefreshMutation } from '@entities/viewer/model/api';
import { queryParams } from '@shared/constants';
import { URL_LOGIN, URL_PROFILE } from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';
import Spinner from '@shared/ui/Spinner';
import { useStatus } from '@shared/utils/hooks/use-status';
import React, { ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export interface AuthRedirectProps {
    children: JSX.Element;
}

export const AuthRedirect = ({ children }: AuthRedirectProps) => {
    const [refreshMutation, { isSuccess, isError, data: loginData, isLoading }] =
        useRefreshMutation();
    const { handleLogin } = useAuth();

    const navigate = useNavigate();
    const [isShowAuth, setIsShowAuth] = useState(false);

    useEffect(() => {
        const refreshToken = localStorage.getItem(storageKeys.refreshToken)!;

        if (!refreshToken) return setIsShowAuth(true);

        refreshMutation(refreshToken);
    }, []);

    useStatus(() => {
        handleLogin(loginData)
        navigate(URL_PROFILE, { replace: true });
    }, isSuccess);

    if (isLoading) return <Spinner loading />;
    if (isError) return children;

    return isShowAuth ? children : <Spinner loading />;
};
