import React from 'react';
import { Button } from '@shared/ui/Button';
import { KeeperRatingCard } from '@shared/ui/KeeperRatingCard';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';
import { useShowMore } from '@shared/utils/hooks/use-show-more';

import { buttonSize } from '@shared/ui/Button/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { GalaxyInformationProps } from './interface';

export const GalaxyInformation: React.FC<GalaxyInformationProps> = ({
    currentGalaxy,
}) => {
    const [block, element] = bem('galaxies-page');

    const {
        limitElements: keepers,
        handleShowMore,
        handleHideAll,
        isLastLimit,
    } = useShowMore(currentGalaxy?.keepers!, 9, 3);

    return (
        <>
            <div className={element('information-description')}>
                <Typography variant={typographyVariant.h2}>
                    Описание галактики
                </Typography>
                <Typography variant={typographyVariant.regular14}>
                    {currentGalaxy?.galaxyDescription}
                </Typography>
            </div>

            <div className={element('keepers-section')}>
                <Typography variant={typographyVariant.h2}>
                    Преподаватели в этой галактике
                </Typography>
                <div className={element('keepers-list-wrapper')}>
                    {keepers.length === 0 && (
                        <Typography variant={typographyVariant.medium16}>
                            У данной галактики нет хранителей
                        </Typography>
                    )}

                    {keepers.map((keeper) => (
                        <KeeperRatingCard
                            key={keeper.personId}
                            fullname={getUserFullName(keeper)}
                        />
                    ))}
                </div>

                <div>
                    {keepers.length !== 0 &&
                        (isLastLimit ? (
                            <Button
                                title='Скрыть всё'
                                size={buttonSize.small}
                                onClick={handleHideAll}
                            />
                        ) : (
                            <Button
                                title='Показать ещё'
                                size={buttonSize.small}
                                onClick={handleShowMore}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};
