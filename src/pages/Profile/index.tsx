import { useMemo } from 'react';
import { Explorer } from '@pages/Explorer/page';
import { Keeper } from '@pages/Keeper/page';
import { URL_DEFAULT } from '@shared/constants/links';
import { roles, storageKeys } from '@shared/constants/storageKeys';
import { Navigate } from 'react-router-dom';
import { loadingIsLoadingSelector } from '@entities/loading/model/selectors';
import { useAppSelector } from '@app/providers/store/hooks';

const Profile = () => {
	const currentRole = useMemo<roles | "NOT_SELECTED">(() => {
		const role: roles | null = localStorage.getItem(storageKeys.currentRole) as roles;

		if (!role) {
			return 'NOT_SELECTED'
		} else if (role === 'EXPLORER') {
			return 'EXPLORER';
		} else if (role === 'KEEPER') {
			return 'KEEPER';
		} else {
			return 'NOT_SELECTED'
		}
	}, [])

	return (
		<>
			{currentRole === 'EXPLORER' && <Explorer />}
			{currentRole === 'KEEPER' && <Keeper />}
			{currentRole === 'NOT_SELECTED' && <Navigate to={URL_DEFAULT}/>}
		</>
	);
};

export default Profile