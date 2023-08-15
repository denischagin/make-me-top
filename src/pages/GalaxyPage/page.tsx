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
import { getUserProgressInGalaxy } from '@entities/galaxy/thunks/getUserProgressInGalaxy';
import Galaxy from '@entities/galaxy/ui';

import { BackgroundGalaxyPage } from '@shared/BackgroundGalaxyPage';
import { TitleGalaxyPage } from '@shared/TitleGalaxyPage';

import { bem } from '@shared/utils/bem';

import { Header } from '@widgets/Header';

import {
    galaxyNameSelector,
    orbitListSelector,
    userProgressSelector,
} from '@pages/GalaxyPage/model';

import './styles.scss';

export const GalaxyPage: React.FC = () => {
    const [block, element] = bem('galaxy-page');

    const dispatch = useAppDispatch();

    const galaxyPageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        dispatch(getGalaxy({
            galaxyId: DEFAULT_GALAXY_ID,
        }));
        dispatch(getUserProgressInGalaxy({
            galaxyId: DEFAULT_GALAXY_ID,
        }));
        dispatch(getExplorerInfo({}));
    }, []);

    const galaxyName = useAppSelector(galaxyNameSelector);
    const orbitList = useAppSelector(orbitListSelector);
    const userProgress = useAppSelector(userProgressSelector);

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
                userProgress={userProgress}
                orbitList={orbitList}
            />
        </div>
    );
};
