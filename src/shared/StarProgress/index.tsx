import React from 'react';
import { IStarProgressProps } from '@shared/StarProgress/interface';

import { bem } from '@shared/utils/bem';

import './styles.scss';

const StarProgress: React.FC<IStarProgressProps> = (props) => {
    const {
        percentageProgress,
    } = props;

    const [block, element] = bem('star-progress');

    const isProgress = !percentageProgress;

    return (
        <div className={block()}>
            {
                isProgress &&
                <div
                    className={element('circle')}
                    style={{
                        bottom: `${percentageProgress}%`,
                    }}
                />
            }
        </div>
    );
};

export default StarProgress;
