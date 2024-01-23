import { useAuth } from '@entities/viewer';
import { useRefreshMutation } from '@entities/viewer/api/api';
import { URL_PROFILE } from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';
import Spinner from '@shared/ui/Spinner';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthResponse } from '@entities/viewer/model/types/api';

export interface AuthRedirectProps {
    children: ReactElement;
}

export const AuthRedirect = ({ children }: AuthRedirectProps) => {
    const [refreshMutation] =
        useRefreshMutation();
    const { handleLogin } = useAuth();

    const navigate = useNavigate();
    const [isShowAuth, setIsShowAuth] = useState(false);

    const handleSuccessRefresh = (loginData: AuthResponse) => {
        handleLogin(loginData);
        navigate(URL_PROFILE, { replace: true });
    };

    useEffect(() => {
        const refreshToken = localStorage.getItem(storageKeys.refreshToken)!;

        if (!refreshToken) return setIsShowAuth(true);

        refreshMutation(refreshToken)
            .unwrap()
            .then(handleSuccessRefresh)
            .catch(() => setIsShowAuth(true));
    }, []);

    return isShowAuth ? children : <Spinner loading />;
};
