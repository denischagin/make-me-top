import React,
{
    useEffect,
    useRef,
} from 'react';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { getExplorerInfo } from '@entities/explorer/thunks/getExplorerInfo';

import { DEFAULT_GALAXY_ID } from '@entities/galaxy/model/constants';
import { getGalaxy } from '@entities/galaxy/thunks/getGalaxy';
import Galaxy from '@entities/galaxy/ui';

import { BackgroundGalaxyPage } from '@shared/BackgroundGalaxyPage';
import { TitleGalaxyPage } from '@shared/TitleGalaxyPage';

import { bem } from '@shared/utils/bem';

import { Header } from '@widgets/Header';

import {
    galaxyNameSelector,
    orbitListSelector,
} from '@pages/GalaxyPage/model';

import './styles.scss';

export const GalaxyPage: React.FC = () => {
    const [block, element] = bem('galaxy-page');

    const dispatch = useAppDispatch();

    const galaxyPageRef = useRef<HTMLDivElement | null>(null);

    const testUserProgress = {
        openedSystemList: [4, 7, 8, 9, 10, 13],
        closedSystemList: [11, 12, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        inProgressSystemList: [
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
        dispatch(getExplorerInfo({}));
    }, []);

    const galaxyName = useAppSelector(galaxyNameSelector);

    const orbitList = useAppSelector(orbitListSelector);

    const userProgress = useAppSelector(state => state.explorer.explorerInfo);

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
