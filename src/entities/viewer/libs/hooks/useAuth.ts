import { useAppDispatch, useAppSelector } from '@app/providers/store/hooks';
import { login, logout } from '@entities/viewer/model/slice';
import { ViewerState } from '@entities/viewer/model/types';
import { AuthResponse } from '@entities/viewer/model/types/api';
import { storageKeys } from '@shared/constants/storageKeys';
import { baseApi } from '@shared/api/baseApi';

export interface UseAuthLoginData extends Partial<AuthResponse> {
}

export interface ReturnUseAuth extends ViewerState {
	handleLogin: (loginData: UseAuthLoginData | undefined) => void;
	handleLogout: () => void;
}

export const useAuth = (): ReturnUseAuth => {
	const dispatch = useAppDispatch();
	
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
	};
};
