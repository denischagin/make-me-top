import { ReactElement, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { storageKeys } from '@shared/constants/storageKeys';
import { useRefreshMutation } from '@entities/viewer/api/api';
import Spinner from '@shared/ui/Spinner';
import { useAuth } from '@entities/viewer/libs/hooks/useAuth';
import { getNavigationPath } from '@entities/viewer/libs/helpers/getNavigationPath';

interface AuthProtectProps {
    children: ReactElement;
}

const logoutAndNavigate = (navigate: NavigateFunction, handleLogout: () => void) => {
    handleLogout();
    navigate(getNavigationPath(location.pathname), { replace: true });
};

export const AuthProtect = ({ children }: AuthProtectProps) => {

    const [refresh, { isSuccess, isError, data: tokens }] =
        useRefreshMutation();
    const { handleLogout, isAuth, handleLogin } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const refreshToken = localStorage.getItem(storageKeys.refreshToken)!;

        if (!refreshToken) return logoutAndNavigate(navigate, handleLogout);
        if (isAuth) return;

        refresh(refreshToken)
            .unwrap()
            .then((loginData) => handleLogin(loginData))
            .catch(() => logoutAndNavigate(navigate, handleLogout));
    }, []);

    if (isAuth) return children;

    return <Spinner loading />;
};
