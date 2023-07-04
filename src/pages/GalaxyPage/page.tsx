import React, { useEffect } from 'react';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { DEFAULT_GALAXY_ID } from '@entities/galaxy/model/constants';
import { getGalaxy } from '@entities/galaxy/thunks/getGalaxy';
import Galaxy from '@entities/galaxy/ui';

import './styles.scss';

export const GalaxyPage: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getGalaxy({
            galaxyId: DEFAULT_GALAXY_ID,
        }));
    }, [dispatch]);

    const orbitList = useAppSelector((state) => state.galaxies.orbitList);

    return (
        <div className="galaxy-page">
            <Galaxy
                orbitList={orbitList}
                width={1920}
                height={910}
                planetWidth={80}
                planetHeight={80}
            />
        </div>
    );
};