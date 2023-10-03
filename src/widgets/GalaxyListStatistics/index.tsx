import React from 'react';

import { GalaxyStatisticsItem } from '@entities/galaxy/ui/GalaxyStatisticsItem';

import { bem } from '@shared/utils/helpers/bem';

import { GalaxyListStatisticsProps } from './interface';

import './style.scss';

export const GalaxyListStatistics = ({
    explorerCount = 0,
    keeperCount = 0,
    systemCount = 0,
}: GalaxyListStatisticsProps) => {
    const [block] = bem('statistics');

    return (
        <div className={block()}>
            <GalaxyStatisticsItem
                title='Количество систем:'
                stat={systemCount}
            />
            <GalaxyStatisticsItem
                title='Количество исследователей:'
                stat={explorerCount}
            />
            <GalaxyStatisticsItem
                title='Количество хранителей:'
                stat={keeperCount}
            />
        </div>
    );
};
