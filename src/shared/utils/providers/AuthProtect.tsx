import {
    useEffect,
    useState,
} from 'react';
import {
    Navigate,
    useLocation,
} from 'react-router-dom';

import { URL_LOGIN } from '@shared/constants/links';
import { storageKeys } from '@shared/constants/storageKeys';

interface AuthProtectProps {
    children: JSX.Element;
}

const getTokenFromLocalStorage = () => {
    return localStorage.getItem(storageKeys.tokenAuth);
};

export const AuthProtect = ({
    children,
}: AuthProtectProps) => {
    const [isAuth, setIsAuth] = useState(true);
    useEffect(() => {
        const token = getTokenFromLocalStorage();

        if (!token) setIsAuth(false);
    }, []);

    if (!isAuth) {
        return (
            <Navigate
                to={`${URL_LOGIN}?redirect=${encodeURIComponent(
                    location.pathname,
                )}`}
                replace
            />
        );
    }

    return children;
};
