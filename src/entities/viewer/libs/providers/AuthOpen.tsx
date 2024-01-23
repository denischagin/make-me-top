import { storageKeys } from '@shared/constants/storageKeys';
import React, { ReactElement, useEffect, useMemo } from 'react';
import Spinner from '@shared/ui/Spinner';
import { useRefreshMutation } from '@entities/viewer/api/api';
import { useAuth } from '@entities/viewer';

export const AuthOpen = ({ children }: { children: ReactElement }) => {
    const [refresh, { isSuccess, isError }] =
        useRefreshMutation();
    const { handleLogout, isAuth } = useAuth();

    const refreshToken = useMemo(() => localStorage.getItem(storageKeys.refreshToken), []);

    useEffect(() => {
        if (!refreshToken) return handleLogout;
        if (isAuth) return;

        refresh(refreshToken)
            .unwrap()
            .catch(handleLogout);
    }, []);

    if (isSuccess || isError || !refreshToken || isAuth) return children;

    return <Spinner loading />;
};
