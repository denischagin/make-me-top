import { useState } from 'react';

import { Card } from '@shared/Card';
import { ExplorerItem } from '@shared/ExplorerItem';
import { RouterLink } from '@shared/RouterLink';
import { ShowMoreElemenetsButton } from '@shared/ShowMoreElemenetsButton';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { URL_EXPLORER } from '@shared/constants/links';

import { DEFAULT_EL_LIMIT } from '@widgets/Reviews/model';

import { ExplorerItemListInterface } from './interfaces';
import { buttonSize } from '@shared/Button/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import { DEFAULT_LIMIT_ITEM } from './model';

import './styles.scss';

export const ExplorerItemList = (props: ExplorerItemListInterface) => {
    const {
        explorers,
    } = props;

    const [block, element] = bem('explorer-card-list');
    const [limitEl, setLimitEl] = useState<number>(DEFAULT_LIMIT_ITEM);

    const totalExplorers = explorers?.length || 0;

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
                    {`Всего учеников: ${totalExplorers}`}
                </Typography>
                {
                    explorers?.slice(0, limitEl).map((user) => (
                        <RouterLink
                            to={`${URL_EXPLORER}/${user.personId}`}
                            key={user.courseId}
                        >
                            <ExplorerItem
                                name={`${user.lastName} ${user.firstName} ${user.patronymic}`}
                                avatar=''
                            />
                        </RouterLink>
                    ))
                }
                <ShowMoreElemenetsButton
                    setElLimit={setLimitEl}
                    openButtonTitle='Все ученики'
                    elementsLength={explorers?.length}
                    defaultElementsLimit={DEFAULT_LIMIT_ITEM}
                    currentElementsLimit={limitEl}
                    buttonSize={buttonSize.large}
                />
            </Card>
        </div>
    );
};
