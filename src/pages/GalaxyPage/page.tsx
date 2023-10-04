import React, { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { BackgroundGalaxyPage } from '@shared/ui/BackgroundGalaxyPage';
import { TitleGalaxyPage } from '@shared/ui/TitleGalaxyPage';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import Galaxy from '@entities/galaxy/ui';

import { bem } from '@shared/utils/helpers/bem';

import { Header } from '@widgets/Header';

import {
    galaxyNameSelector,
    orbitListSelector,
    userProgressSelector,
} from '@pages/GalaxyPage/model';

import {
    useGalaxyWindowSizeDebounce,
    useGetAllGalaxyInfoByGalaxyId,
} from './hooks';

import './styles.scss';

const GalaxyPage: React.FC = () => {
    const [block, element] = bem('galaxy-page');
    const {
        galaxyId,
    } = useParams();

    const galaxyPageRef = useRef<HTMLDivElement | null>(null);

    const windowSizeDebounce = useGalaxyWindowSizeDebounce();

    const galaxyName = useAppSelector(galaxyNameSelector);
    const orbitList = useAppSelector(orbitListSelector);
    const userProgress = useAppSelector(userProgressSelector);

    useGetAllGalaxyInfoByGalaxyId(Number(galaxyId));

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
