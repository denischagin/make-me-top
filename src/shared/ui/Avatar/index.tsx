import { bem } from '@shared/utils/helpers/bem';
import defaultImg from './anonimous.jpeg';

import { AvatarInterface } from './interfaces';

import './styles.scss';
import { URL_MMT_STAND } from '@shared/constants/urls';

export const Avatar = (props: AvatarInterface) => {
    const {
        size,
        orbit,
        isActive,
        image = URL_MMT_STAND + 'pics/12/?type=NORMAL',
        ...restProps
    } = props;

    const [block, element] = bem('avatar');

    return (
        <div
            className={block({
                size,
            })}
            {...restProps}
        >
            {orbit && (
                <div
                    className={element('border', {
                        size,
                    })}
                >
                    <div className={element('orbit', 'mt-5')} />
                </div>
            )}
            <img
                src={image}
                alt=''
                className={element('image', {
                    size,
                    active: isActive,
                })}
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = defaultImg;
                }}
            />
        </div>
    );
};
