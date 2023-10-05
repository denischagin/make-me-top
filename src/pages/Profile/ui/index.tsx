import { useMemo } from 'react';
import { Navigate } from 'react-router-dom';

import { URL_LOGIN } from '@shared/constants/links';
import { roles } from '@shared/constants/storageKeys';

import { Explorer } from '@pages/Explorer/page';
import { Keeper } from '@pages/Keeper/page';
import { getRoleFromLocalStorage } from '@pages/Profile/utils';

export type RolesWithNotSelectedType = roles | 'NOT_SELECTED';

const ProfileByRole: Record<RolesWithNotSelectedType, JSX.Element> = {
    EXPLORER: <Explorer />,
    KEEPER: <Keeper />,
    NOT_SELECTED: <Navigate to={URL_LOGIN} />,
};

const Profile = () => {
    const currentRole = useMemo<RolesWithNotSelectedType>(() => {
        const role = getRoleFromLocalStorage();
        return role ?? "NOT_SELECTED";
    }, []);

    return ProfileByRole[currentRole];
};

export default Profile;
