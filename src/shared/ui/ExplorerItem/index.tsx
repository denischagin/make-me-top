import { Avatar } from '@shared/ui/Avatar';
import { Typography } from '@shared/ui/Typography';

import { ReactComponent as ArrowIcon } from '@shared/images/small-arrow.svg';

import { bem } from '@shared/utils/helpers/bem';

import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { ExplorerItemInterface } from '@shared/types/common';

import './styles.scss';

export const ExplorerItem = (props: ExplorerItemInterface) => {
    const { name } = props;

    const [block, element] = bem('explorer-item');

    return (
        <div className={block()}>
            <Avatar size={avatarSize.small} />
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
