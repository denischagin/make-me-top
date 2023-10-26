import { BackgroundUsersList } from '@shared/ui/BackgroundUsersList';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';
import { SortCard } from '@shared/ui/SortCard';

import { bem } from '@shared/utils/helpers/bem';
import { useShowMore } from '@shared/utils/hooks/use-show-more';

import { ExplorersList } from '@widgets/ExplorersList';
import { Header } from '@widgets/Header/ui/Header';

import { buttonSize } from '@shared/ui/Button/interfaces';

import './styles.scss';
import { useGetAllExplorersQuery } from '@entities/explorer/api/api';

const Explorers = () => {
    const [block, element] = bem('explorers');

    const { data: explorersList, isSuccess } = useGetAllExplorersQuery();

    const { handleHideAll, handleShowMore, isLastLimit, limitElements } =
        useShowMore(explorersList ?? [], 10, 5);

    return (
        <div className={block()}>
            <Header />
            {isSuccess && (
                <Container className={element('container')}>
                    <div className={element('sort-panel')}>
                        <SortCard title='Сортировать' />
                        <SortCard title='Период отображения' />
                        <SortCard title='За весь период' />
                    </div>

                    <ExplorersList explorers={limitElements} />

                    {explorersList?.length !== 0 && isLastLimit ? (
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

export default Explorers;
