import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowButton } from '@shared/ui/ArrowButton';
import { BackgroundGalaxies } from '@shared/ui/BackgroundGalaxies';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';
import { EntryAnimateGalaxies } from '@shared/ui/EntryAnimateGalaxies';
import { TitleGalaxyPage } from '@shared/ui/TitleGalaxyPage';
import { Typography } from '@shared/ui/Typography';

import { useGetAllGalaxiesQuery } from '@entities/galaxy/api/api';

import { bem } from '@shared/utils/helpers/bem';

import { URL_GALAXY } from '@shared/constants/links';

import { ChangeGalaxyButtons } from '@widgets/ChangeGalaxyButtons';
import { GalaxyInformation } from '@widgets/GalaxyInformation';
import { GalaxyListStatistics } from '@widgets/GalaxyListStatistics';
import { Header } from '@widgets/Header';

import NotFound from '@pages/NotFound';

import { arrowButtonDirection } from '@shared/ui/ArrowButton/interfaces';
import { buttonColor, buttonSize } from '@shared/ui/Button/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { useCurrentGalaxy } from './hooks';

import './style.scss';

const AllGalaxiesPage = () => {
    const { data: galaxies = [], isError } = useGetAllGalaxiesQuery();
    const {
        currentGalaxy,
        handleNextGalaxy,
        handlePrevGalaxy,
        circleNextGalaxyName,
        circlePrevGalaxyName,
    } = useCurrentGalaxy(galaxies);

    const informationSectionRef = useRef<HTMLElement>(null);
    const navigate = useNavigate();

    const [block, element] = bem('galaxies-page');

    const handleShowInformation = () =>
        informationSectionRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });

    const handleReturnToWelcome = () =>
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

    const handleNavigateSystems = () =>
        navigate(URL_GALAXY + `/${currentGalaxy?.galaxyId}`);

    if (isError) return <NotFound />;

    return (
        <div className={block()}>
            <BackgroundGalaxies />
            <Header />
            <Container>
                <div className={element('content')}>
                    <EntryAnimateGalaxies className={element('title-wrapper')}>
                        <TitleGalaxyPage
                            galaxyName={currentGalaxy?.galaxyName!}
                        />
                    </EntryAnimateGalaxies>

                    <ChangeGalaxyButtons
                        handlePrevGalaxy={handlePrevGalaxy}
                        handleNextGalaxy={handleNextGalaxy}
                        prevGalaxyName={circlePrevGalaxyName}
                        nextGalaxyName={circleNextGalaxyName}
                    />

                    <EntryAnimateGalaxies delay={0.2}>
                        <GalaxyListStatistics
                            explorerCount={currentGalaxy?.explorerCount}
                            keeperCount={currentGalaxy?.keeperCount}
                            systemCount={currentGalaxy?.systemCount}
                        />
                    </EntryAnimateGalaxies>

                    <EntryAnimateGalaxies delay={0.3}>
                        <Button
                            size={buttonSize.large}
                            color={buttonColor.filled}
                            title='Перейти к системам'
                            onClick={handleNavigateSystems}
                        />
                    </EntryAnimateGalaxies>

                    <EntryAnimateGalaxies
                        delay={0.4}
                        className={element('look-more')}
                    >
                        <Typography variant={typographyVariant.regular14}>
                            Информация о галактике
                        </Typography>

                        <ArrowButton
                            direction={arrowButtonDirection.bottom}
                            onClick={handleShowInformation}
                        />
                    </EntryAnimateGalaxies>

                    <section
                        className={element('information')}
                        ref={informationSectionRef}
                    >
                        <GalaxyInformation currentGalaxy={currentGalaxy} />
                    </section>

                    <ArrowButton
                        direction={arrowButtonDirection.top}
                        onClick={handleReturnToWelcome}
                    />
                </div>
            </Container>
        </div>
    );
};

export default AllGalaxiesPage;
