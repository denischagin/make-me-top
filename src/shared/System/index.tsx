import SystemProgress from '@shared/SystemProgress';

import { ReactComponent as OrbitIcon } from '@shared/images/orbit.svg';

import { bem } from '@shared/utils/bem';

import { SystemInterface } from './interfaces';

import './styles.scss';

export const System = (props: SystemInterface) => {
    const {
        color,
        children,
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
                <SystemProgress percentageProgress={props.percentageProgress} />
                {children}
                <div className={element('orbit')}>
                    <OrbitIcon
                        className={element('orbit-icon', {
                            color,
                        })}
                    />
                </div>
            </div>
        </div>
    );
};