import { useAppDispatch, useAppSelector } from '@app/providers/store/hooks';
import { login, logout } from '@entities/viewer/model/slice';
import { ViewerState } from '@entities/viewer/model/types';
import { AuthResponse } from '@entities/viewer/model/types/api';
import { storageKeys } from '@shared/constants/storageKeys';
import { baseApi } from '@shared/api/baseApi';
import { searchParamKeys } from '@shared/constants';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { URL_PROFILE } from '@shared/constants/links';

export interface UseAuthLoginData extends Partial<AuthResponse> {
}

export interface ReturnUseAuth extends ViewerState {
    handleLogin: (loginData: UseAuthLoginData | undefined) => void;
    handleLogout: () => void;
    handleLoginRedirect: () => void;
}

export const useAuth = (): ReturnUseAuth => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const navigate = useNavigate();

    const handleLogin = (loginData: UseAuthLoginData | undefined) => {
        if (!loginData) return;
        const { accessToken, refreshToken, role } = loginData;
        if (!accessToken || !refreshToken || !role) return;

        dispatch(login({ accessToken, refreshToken, role }));
        localStorage.setItem(storageKeys.accessToken, accessToken.accessToken);
        localStorage.setItem(
            storageKeys.refreshToken,
            refreshToken.refreshToken,
        );
    };

    const handleLoginRedirect = () => {
        const redirect = searchParams.get(searchParamKeys.redirect);

        if (redirect !== null)
            return navigate(redirect, {
                replace: true,
            });

        return navigate(URL_PROFILE, {
            replace: true,
        });
    };

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem(storageKeys.accessToken);
        localStorage.removeItem(storageKeys.refreshToken);
        dispatch(baseApi.util?.resetApiState());
    };

    return {
        ...useAppSelector((state) => state.viewer),
        handleLogin,
        handleLogout,
        handleLoginRedirect,
    };
};
