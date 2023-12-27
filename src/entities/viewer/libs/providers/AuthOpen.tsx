import { storageKeys } from '@shared/constants/storageKeys';
import React, { ReactNode, useEffect, useMemo } from 'react';
import { useStatus } from '@shared/utils/hooks/use-status';
import Spinner from '@shared/ui/Spinner';
import { useRefreshMutation } from '@entities/viewer/api/api';
import { useAuth } from '@entities/viewer';

export const AuthOpen = ({ children }: { children: JSX.Element }) => {
	const [refresh, { isSuccess, isError, data: tokens }] =
		useRefreshMutation();
	const { handleLogout, isAuth } = useAuth();
	
	const refreshToken = useMemo(() => localStorage.getItem(storageKeys.refreshToken)!, []);
	
	useEffect(() => {
		if (!refreshToken) return handleLogout;
		if (isAuth) return;
		
		refresh(refreshToken)
			.unwrap()
			.catch(handleLogout)
	}, []);

	if (isSuccess || isError || !refreshToken || isAuth) return children;
	
	return <Spinner loading />;
};
