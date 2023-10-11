import { BackgroundUsersList } from '@shared/ui/BackgroundUsersList';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';
import { SortCard } from '@shared/ui/SortCard';
import { bem } from '@shared/utils/helpers/bem';
import { useShowMore } from '@shared/utils/hooks/use-show-more';

import { Header } from '@widgets/Header';
import { KeepersList } from '@widgets/KeepersList';

import { buttonSize } from '@shared/ui/Button/interfaces';

import './styles.scss';
import { useGetAllKeepersQuery } from '@entities/keeper/api/api';

const Keepers = () => {
    const [block, element] = bem('keepers');
    const { data: keepersList, isSuccess } = useGetAllKeepersQuery();

    const { handleHideAll, handleShowMore, isLastLimit, limitElements } =
        useShowMore(keepersList ?? [], 10, 5);

    return (
        <div className={block()}>
            <BackgroundUsersList />
            <Header />

            {isSuccess && (
                <Container className={element('container')}>
                    <div className={element('sort-panel')}>
                        <SortCard title='Сортировать' value='С 1 до конца' />
                        <SortCard
                            title='Период отображения'
                            value='За весь период'
                        />
                        <SortCard title='За весь период' value='Все звезды' />
                    </div>

                    {keepersList.length !== 0 && (
                        <KeepersList keepers={limitElements} />
                    )}

                    {keepersList?.length !== 0 && isLastLimit ? (
                        <Button
                            size={buttonSize.large}
                            title='Скрыть всё'
                            onClick={handleHideAll}
                        />
                    ) : (
                        <Button
                            size={buttonSize.large}
                            title='Показать еще'
                            onClick={handleShowMore}
                        />
                    )}
                </Container>
            )}
        </div>
    );
};

export default Keepers;
