import React from 'react';

import { bem } from '@shared/utils/bem';

import './styles.scss';

import { IStarProgressProps } from '@shared/StarProgress/interface';

const StarProgress: React.FC<IStarProgressProps> = (props) => {
    const {
        percentageProgress,
    } = props;

    const [block, element] = bem('star-progress');

    return (
        <div className={block()}>
            <div
                className={element('circle')}
                style={{
                    bottom: `${percentageProgress}%`,
                }}
            />
        </div>
    );
};

export default StarProgress;
