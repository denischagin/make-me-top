import { useEffect, useState } from 'react';

import { useAppDispatch } from '@app/providers/store/hooks';

import { getExplorerInfo } from '../../entities/explorer/thunks/getExplorerInfo';
import { getGalaxy } from '../../entities/galaxy/thunks/getGalaxy';
import { getUserProgressInGalaxy } from '../../entities/galaxy/thunks/getUserProgressInGalaxy';
import { roles, storageKeys } from '../../shared/constants/storageKeys';
import { useAuth } from '@entities/viewer/hooks/useAuth';

export const useGalaxyWindowSizeDebounce = () => {
    const [windowSizeDebounce, setWindowSizeDebounce] = useState(
        window.innerWidth,
    );

    useEffect(() => {
        let timeout: NodeJS.Timeout | undefined;

        const updateSize = () => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                const innerWidth = window.innerWidth;
                setWindowSizeDebounce(innerWidth);
            }, 100);
        };

        window.addEventListener('resize', updateSize);
        updateSize();

        return () => {
            window.removeEventListener('resize', updateSize);
            clearTimeout(timeout);
        };
    }, []);

    return windowSizeDebounce;
};

export const useGetAllGalaxyInfoByGalaxyId = (galaxyId: number | undefined) => {
    const dispatch = useAppDispatch();

    const { currentRole } = useAuth();
    useEffect(() => {
        dispatch(
            getGalaxy({
                galaxyId: Number(galaxyId),
            }),
        );
        //TODO

        if (currentRole === 'KEEPER') return;

        dispatch(
            getUserProgressInGalaxy({
                galaxyId: Number(galaxyId),
            }),
        );
        //TODO
        dispatch(getExplorerInfo({}));
    }, []);
};
