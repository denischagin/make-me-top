import { useAuth } from '@entities/viewer';
import { useRefreshMutation } from '@entities/viewer/api/api';
import { URL_PROFILE } from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';
import Spinner from '@shared/ui/Spinner';
import React, { useEffect, useState } from 'react';
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

    const handleSuccessRefresh = () => {
        handleLogin(loginData);
        navigate(URL_PROFILE, { replace: true });
    };

    useEffect(() => {
        const refreshToken = localStorage.getItem(storageKeys.refreshToken)!;

        if (!refreshToken) return setIsShowAuth(true);

        refreshMutation(refreshToken)
            .unwrap()
            .then(handleSuccessRefresh);
    }, []);

    if (isLoading) return <Spinner loading />;
    if (isError) return children;

    return isShowAuth ? children : <Spinner loading />;
};
