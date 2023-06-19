import { ReactComponent as OrbitIcon } from '@shared/images/orbit.svg';

import { bem } from '@shared/utils/bem';

import { StarInterface } from './interfaces';

import './styles.scss';

export const Star = (props: StarInterface) => {
    const [block, element] = bem('star');

    return (
        <div
            className={block({
                color: props.color,
            })}
        >
            <div
                className={element('info', {
                    color: props.color,
                })}
            >
                {props.children}
                <div className={element('orbit')}>
                    <OrbitIcon
                        className={element('orbit-icon', {
                            color: props.color,
                        })}
                    />
                </div>
            </div>
        </div>
    );
};
