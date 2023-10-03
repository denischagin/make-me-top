import { Avatar } from '@shared/ui/Avatar';
import { Badge } from '@shared/ui/Badge';
import { Rating } from '@shared/ui/Rating';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { CurrentUserItemInterface } from './interfaces';
import { avatarSize } from '@shared/ui/Avatar/interfaces';
import { badgeColor } from '@shared/ui/Badge/interfaces';
import {
    ratingScoreColor,
    ratingSize,
    ratingSystemColor,
} from '@shared/ui/Rating/interfaces';

import './styles.scss';

export const CurrentUserItem = (props: CurrentUserItemInterface) => {
    const { badgeTitle, keeper, explorer } = props;

    const [block, element] = bem('current-user');

    const keeperOrExplorer = keeper || explorer;

    return (
        <div className={block()}>
            <div className={element('item')}>
                <div className={element('user')}>
                    <Avatar size={avatarSize.small} />
                    <span className={element('my-name')}>
                        {getUserFullName(keeperOrExplorer)}
                    </span>
                </div>
                <div className={element('info')}>
                    <span className={element('badge')}>
                        <Badge color={badgeColor.primary500}>
                            {badgeTitle}
                        </Badge>
                    </span>
                    <Rating
                        systemColor={ratingSystemColor.primary500}
                        size={ratingSize.medium}
                        scoreColor={ratingScoreColor.black}
                        rating={keeperOrExplorer?.rating}
                    />
                </div>
            </div>
        </div>
    );
};
