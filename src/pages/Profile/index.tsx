import { roles } from '@shared/constants/storageKeys';

import { Explorer } from '@pages/Explorer/page';
import { Keeper } from '@pages/Keeper/page';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header';
import { useAuth } from '@entities/viewer/hooks/useAuth';
import { useEffect } from 'react';
import { useGetExplorerProfileQuery } from '@entities/explorer/api/api';

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
    const { role, isAuth } = useAuth();
    console.log(role)
    const { data: userInfo, isSuccess, isError } = useGetExplorerProfileQuery();

    return ProfileByRole[role ?? 'GUEST'];
};

export default Profile;
