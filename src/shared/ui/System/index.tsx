import { memo } from 'react';
import SystemProgress from '@shared/ui/SystemProgress';

import { ReactComponent as OrbitIcon } from '@shared/images/orbit.svg';

import { bem } from '@shared/utils/helpers/bem';

import { SystemInterface } from './interfaces';

import './styles.scss';

const System = (props: SystemInterface) => {
    const {
        color,
        children,
        percentageProgress,
        className
    } = props;

    const [block, element] = bem('system');

    return (
        <div
            className={block({
                color,
            })}
        >
            <div
                className={element('info', {
                    color,
                })}
            >
                <SystemProgress percentageProgress={percentageProgress}  />
                {children}
                <div className={element('orbit', className)}>
                    <OrbitIcon
                        className={element('orbit-icon', {
                            color,
                        }, )}
                    />
                </div>
            </div>
        </div>
    );
};

export default memo(System);
