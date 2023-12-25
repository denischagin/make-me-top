import { useState } from 'react';
import { Card } from '@shared/ui/Card';
import { ExplorerItem } from '@shared/ui/ExplorerItem';
import { RouterLink } from '@shared/ui/RouterLink';
import { ShowMoreElemenetsButton } from '@shared/ui/ShowMoreElemenetsButton';
import { Typography } from '@shared/ui/Typography';

import { bem } from '@shared/utils/helpers/bem';

import { URL_EXPLORER } from '@shared/constants/links';

import { ExplorerItemListInterface } from './interfaces';
import { buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import { DEFAULT_LIMIT_ITEM } from './model';

import './styles.scss';
import { useGetKeeperProfileQuery } from '@entities/keeper/api/api';
import { useAuth } from '@entities/viewer';

export const ExplorerItemList = (props: ExplorerItemListInterface) => {
    const {
        explorers,
    } = props;

    const { data: userInfo } = useGetKeeperProfileQuery();

    const [block, element] = bem('explorer-card-list');
    const [limitElements, setElementsLimit] =
        useState<number>(DEFAULT_LIMIT_ITEM);

    return (
        <div className={block()}>
            <Typography
                variant={typographyVariant.h2}
                className={element('heading', 'mb-4')}
            >
                Мои ученики
            </Typography>
            <Card size={cardSize.large}>
                <Typography
                    className={element('card-heading', 'mb-4')}
                    variant={typographyVariant.regular16}
                >
                    {`Всего учеников: ${userInfo?.totalExplorers ?? 0}`}
                </Typography>
                {explorers?.slice(0, limitElements).map((user) => (
                    <RouterLink
                        to={`${URL_EXPLORER}/${user.personId}`}
                        key={user.personId}
                    >
                        <ExplorerItem
                            name={`${user.lastName} ${user.firstName} ${user.patronymic}`}
                            avatar=''
                        />
                    </RouterLink>
                ))}
                <ShowMoreElemenetsButton
                    setElementsLimit={setElementsLimit}
                    openButtonTitle='Все ученики'
                    elementsLength={explorers?.length}
                    defaultElementsLimit={DEFAULT_LIMIT_ITEM}
                    currentElementsLimit={limitElements}
                    buttonSize={buttonSize.large}
                />
            </Card>
        </div>
    );
};
