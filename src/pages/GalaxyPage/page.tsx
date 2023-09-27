import React,
{
    useEffect,
    useRef,
} from 'react';
import { useParams } from 'react-router-dom';
import { BackgroundGalaxyPage } from '@shared/ui/BackgroundGalaxyPage';
import { TitleGalaxyPage } from '@shared/ui/TitleGalaxyPage';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { getExplorerInfo } from '@entities/explorer/thunks/getExplorerInfo';

import { getGalaxy } from '@entities/galaxy/thunks/getGalaxy';
import { getUserProgressInGalaxy } from '@entities/galaxy/thunks/getUserProgressInGalaxy';
import Galaxy from '@entities/galaxy/ui';

import { bem } from '@shared/utils/bem';

import {
    roles,
    storageKeys,
} from '@shared/constants/storageKeys';

import { Header } from '@widgets/Header';

import {
    galaxyNameSelector,
    orbitListSelector,
    userProgressSelector,
} from '@pages/GalaxyPage/model';

import { useGalaxyWindowSizeDebounce } from './hooks';

import './styles.scss';

const GalaxyPage: React.FC = () => {
    const [block, element] = bem('galaxy-page');
    const {
        galaxyId,
    } = useParams();

    const dispatch = useAppDispatch();

    const galaxyPageRef = useRef<HTMLDivElement | null>(null);

    const {
        windowSizeDebounce,
    } = useGalaxyWindowSizeDebounce();

    useEffect(() => {
        dispatch(
            getGalaxy({
                galaxyId: Number(galaxyId),
            }),
        );
        const currentRole: roles = localStorage.getItem(
            storageKeys.currentRole,
        ) as roles;

        if (currentRole === 'KEEPER') return;

        dispatch(
            getUserProgressInGalaxy({
                galaxyId: Number(galaxyId),
            }),
        );
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
                width={windowSizeDebounce}
                height={800}
                galaxyPage={galaxyPageRef.current}
                svgContainerClass={element('svg-container')}
                userProgress={userProgress}
                orbitList={orbitList}
            />
        </div>
    );
};

export default GalaxyPage;
