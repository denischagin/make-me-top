import { Button } from '@shared/Button';
import { Card } from '@shared/Card';
import { ExplorerItem } from '@shared/ExplorerItem';
import { RouterLink } from '@shared/RouterLink';
import { Typography } from '@shared/Typography';

import { bem } from '@shared/utils/bem';

import { ExplorerItemListInterface } from './interfaces';
import { buttonSize } from '@shared/Button/interfaces';
import { cardSize } from '@shared/Card/interfaces';
import { typographyVariant } from '@shared/Typography/interfaces';

import './styles.scss';

export const ExplorerItemList = (props: ExplorerItemListInterface) => {
    const {
        explorers,
    } = props;

    const [block, element] = bem('explorer-card-list');

    const totalExplorers = explorers?.length || 0;
    const limitItems = 9;

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
                {explorers?.slice(0, limitItems).map((user) => (
                    <RouterLink
                        to={`${user.explorerId}`}
                        key={user.courseId}
                    >
                        <ExplorerItem
                            name={`${user.lastName} ${user.firstName} ${user.patronymic}`}
                            avatar=''
                        />
                    </RouterLink>
                ))}
                {
                    (totalExplorers > 9) &&
                    <div className={element('button', 'mt-3')}>
                        <Button
                            title={'Все ученики'}
                            size={buttonSize.large}
                        />
                    </div>
                }
            </Card>
        </div>
    );
};
