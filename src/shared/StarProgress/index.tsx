import React from 'react';

import { bem } from '@shared/utils/bem';

import './styles.scss';

import { IStarProgressProps } from '@shared/StarProgress/interface';

const StarProgress: React.FC<IStarProgressProps> = (props) => {
    const {
        percentageProgress,
    } = props;

    const [block, element] = bem('star-progress');

    const isProgress = !(props.percentageProgress === 0 ||
        props.percentageProgress === undefined);

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
