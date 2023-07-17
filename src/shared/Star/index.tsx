import StarProgress from '@shared/StarProgress';

import { ReactComponent as OrbitIcon } from '@shared/images/orbit.svg';

import { bem } from '@shared/utils/bem';

import { StarInterface } from './interfaces';

import './styles.scss';

export const Star = (props: StarInterface) => {
    const {
        color,
        children,
    } = props;

    const [block, element] = bem('star');

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
                <StarProgress percentageProgress={props.percentageProgress} />
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