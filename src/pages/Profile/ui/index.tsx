import { useMemo } from 'react';

import { roles } from '@shared/constants/storageKeys';

import { Explorer } from '@pages/Explorer/page';
import { Keeper } from '@pages/Keeper/page';
import { getRoleFromLocalStorage } from '@pages/Profile/utils';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header';
import { useAuth } from '@entities/viewer/hooks/useAuth';

const ProfileDefault = (
    <>
        <BackgroundProfile />
        <Header links={[]} />
    </>
);

const ProfileByRole: Record<roles, JSX.Element> = {
    EXPLORER: <Explorer />,
    KEEPER: <Keeper />,
    GUEST: ProfileDefault,
};

const Profile = () => {
    const { currentRole } = useAuth();

    return ProfileByRole[currentRole ?? "GUEST"];
};

export default Profile;
