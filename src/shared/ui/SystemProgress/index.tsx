import React from 'react';
import { SystemProgressProps } from '@shared/ui/SystemProgress/interface';

import { bem } from '@shared/utils/helpers/bem';

import './styles.scss';

const SystemProgress: React.FC<SystemProgressProps> = (props) => {
    const {
        percentageProgress,
    } = props;

    const [block, element] = bem('system-progress');

    const isProgress = percentageProgress !== undefined;

    return (
        <div className={block()}>
            {isProgress && (
                <div
                    className={element('circle')}
                    style={{
                        bottom: `${percentageProgress}%`,
                    }}
                />
            )}
        </div>
    );
};

export default SystemProgress;
