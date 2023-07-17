import React,
{
    useEffect,
    useRef,
} from 'react';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { DEFAULT_GALAXY_ID } from '@entities/galaxy/model/constants';
import { getGalaxy } from '@entities/galaxy/thunks/getGalaxy';
import Galaxy from '@entities/galaxy/ui';

import { BackgroundGalaxyPage } from '@shared/BackgroundGalaxyPage';
import { TitleGalaxyPage } from '@shared/TitleGalaxyPage';

import { bem } from '@shared/utils/bem';

import { Header } from '@widgets/Header';

import './styles.scss';

export const GalaxyPage: React.FC = () => {
    const [block, element] = bem('galaxy-page');

    const dispatch = useAppDispatch();

    const galaxyPageRef = useRef<HTMLDivElement | null>(null);

    const testUserProgress = {
        openSystemList: [4, 7, 8, 9, 10, 13, 17],
        closeSystemList: [11, 12, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24],
        educationSystemList: [
            {
                systemId: 1,
                completed: 25,
            },
            {
                systemId: 2,
                completed: 50,
            },
            {
                systemId: 3,
                completed: 75,
            },
            {
                systemId: 5,
                completed: 50,
            },
            {
                systemId: 6,
                completed: 100,
            },
        ],
    };

    useEffect(() => {
        dispatch(getGalaxy({
            galaxyId: DEFAULT_GALAXY_ID,
        }));
    }, [dispatch]);

    const galaxyName = useAppSelector((state) => state.galaxies.galaxyName);

    const orbitList = useAppSelector((state) => state.galaxies.orbitList);

    return (
        <div
            className={block()}
            ref={galaxyPageRef}
        >
            <BackgroundGalaxyPage />
            <Header />
            <TitleGalaxyPage galaxyName={galaxyName} />
            <Galaxy
                width={1920}
                height={910}
                galaxyPage={galaxyPageRef.current}
                svgContainerClass={element('svg-container')}
                userProgress={testUserProgress}
                orbitList={orbitList}
            />
        </div>
    );
};
