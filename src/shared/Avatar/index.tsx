import { bem } from '@shared/utils/bem';

import { AvatarInterface } from './interfaces';

import './styles.scss';

export const Avatar = (props: AvatarInterface) => {
    const {
        size,
        orbit,
        image,
    } = props;

    const [block, element] = bem('avatar');

    return (
        <div
            className={block({
                size,
            })}
        >
            {
                orbit && size === 'large' &&
                <div className={element('border')}>
                    <div className={element('orbit', 'mt-5')} />
                </div>
            }
            <img
                src={image}
                alt=""
                className={element('image', {
                    size,
                })}
            />
        </div>
    );
};
