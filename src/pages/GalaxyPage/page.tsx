import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BackgroundGalaxyPage } from '@shared/ui/BackgroundGalaxyPage';
import { TitleGalaxyPage } from '@shared/ui/TitleGalaxyPage';

import { useAppDispatch, useAppSelector } from '@app/providers/store/hooks';

import Galaxy from '@entities/galaxy/ui';

import { bem } from '@shared/utils/helpers/bem';

import { Header } from '@widgets/Header/ui/Header';

import { useGalaxyWindowSizeDebounce } from './hooks';

import './styles.scss';
import {
    useGetGalaxyQuery,
    useGetUserProgressInGalaxyQuery,
} from '@entities/galaxy/api/api';
import Spinner from '@shared/ui/Spinner';
import NotFound from '@pages/NotFound';
import { useAuth } from '@entities/viewer/hooks/useAuth';

const GalaxyPage: React.FC = () => {
    const [block, element] = bem('galaxy-page');
    const { galaxyId } = useParams();
    const { role } = useAuth();
    const isExplorer = role === 'EXPLORER';

    const galaxyPageRef = useRef<HTMLDivElement | null>(null);

    const windowSizeDebounce = useGalaxyWindowSizeDebounce();

    const {
        data: galaxy,
        isFetching: isLoadingGalaxy,
        isSuccess: isSuccessGalaxy,
        isError: isErrorGalaxy,
    } = useGetGalaxyQuery(Number(galaxyId));

    const { data: userProgress } = useGetUserProgressInGalaxyQuery(
        Number(galaxyId),
        { skip: !isExplorer },
    );

    if (isLoadingGalaxy)
        return (
            <>
                <Spinner loading />
                <Header />
            </>
        );
    if (!isSuccessGalaxy || isErrorGalaxy) return <NotFound />;

    const { galaxyName, orbitList } = galaxy;

    return (
        <div className={block()} ref={galaxyPageRef}>
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
