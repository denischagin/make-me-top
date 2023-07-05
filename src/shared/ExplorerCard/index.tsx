import { Avatar } from '@shared/Avatar';
import { Typography } from '@shared/Typography';

import { ReactComponent as ArrowIcon } from '@shared/images/small-arrow.svg';

import { bem } from '@shared/utils/bem';

import { avatarSize } from '@shared/Avatar/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import { ExplorerCardInterface } from '@shared/types/common';

import './styles.scss';

export const ExplorerCard = (props: ExplorerCardInterface) => {
    const {
        name = '',
        avatar = '',
    } = props;

    const [block, element] = bem('explorer-card');

    return (
        <div className={block()}>
            <Avatar
                size={avatarSize.small}
                image={avatar}
            />
            <Typography
                className={element('name')}
                variant={typographyVariant.regular14}
            >
                {name}
            </Typography>
            <ArrowIcon className={element('icon')} />
        </div>
    );
};
