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
import { RouterLink } from '@shared/ui/RouterLink';
import { roles } from '@shared/constants/storageKeys';
import { getUrlExplorerById, getUrlKeeperById } from '@shared/constants/links';
import { NavLink } from 'react-router-dom';

export const CurrentUserItem = (props: CurrentUserItemInterface) => {
    const {
        badgeTitle,
        personId,
        role,
        ...person
    } = props;

    const [block, element] = bem('current-user');

    const linkByRole: Record<roles, string> = {
        EXPLORER: getUrlExplorerById(personId.toString()),
        KEEPER: getUrlKeeperById(personId.toString()),
    };

    return (
        <NavLink to={linkByRole[role]}>
            <div className={block()}>
                <div className={element('item')}>
                    <div className={element('user')}>
                        <Avatar size={avatarSize.small} personId={personId} />
                        <span className={element('my-name')}>
                             {getUserFullName(person)}
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
                            rating={person?.rating}
                        />
                    </div>
                </div>
            </div>
        </NavLink>
    );
};
