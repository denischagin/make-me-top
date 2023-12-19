import { DividingLineColor } from '@shared/ui/DividingLine/interfaces';
import { ExplorersListTabProps } from './interface';
import { DividingLine } from '@shared/ui/DividingLine';
import { CurrentUserItem } from '@entities/user';
import { UsersList } from '@shared/ui/UsersList';
import { Typography } from '@shared/ui/Typography';
import {
    typographyColor,
    typographyVariant,
} from '@shared/ui/Typography/interfaces';
import { bem } from '@shared/utils/helpers/bem';

export const ExplorersListTab = ({ courseInfo }: ExplorersListTabProps) => {
    const [, element] = bem('circle-modal-galaxy');

    return (
        <>
            {!!courseInfo?.you && (
                <>
                    <CurrentUserItem
                        {...courseInfo.you}
                        role='EXPLORER'
                        badgeTitle='Мой рейтинг'
                    />
                    <DividingLine color={DividingLineColor.gray500} />
                </>
            )}
            {courseInfo?.explorers?.length !== 0 ? (
                <UsersList explorersList={courseInfo?.explorers} />
            ) : (
                <Typography
                    variant={typographyVariant.medium16}
                    color={typographyColor.black}
                    className={element('empty-text')}
                >
                    У данного курса нет исследователей
                </Typography>
            )}
        </>
    );
};
