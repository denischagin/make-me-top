import { roles } from '@shared/constants/storageKeys';

import { Explorer } from '@pages/Explorer/page';
import { Keeper } from '@pages/Keeper/page';
import { BackgroundProfile } from '@shared/ui/BackgroundProfile';
import { Header } from '@widgets/Header';
import { useAuth } from '@entities/viewer/hooks/useAuth';
import { useEffect } from 'react';

const ProfileDefault = (
    <>
        <BackgroundProfile />
        <Header links={[]} />
    </>
);

const ProfileByRole: Record<roles | "GUEST", JSX.Element> = {
    EXPLORER: <Explorer />,
    KEEPER: <Keeper />,
    GUEST: ProfileDefault,
};

const Profile = () => {
    const { role } = useAuth();
    
    return ProfileByRole[role ?? 'GUEST'];
};

export default Profile;
