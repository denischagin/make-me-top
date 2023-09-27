import { useEffect } from 'react';
import { BackgroundUsersList } from '@shared/ui/BackgroundUsersList';
import { Button } from '@shared/ui/Button';
import { Container } from '@shared/ui/Container';
import { SortCard } from '@shared/ui/SortCard';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { loadingIsLoadingSelector } from '@entities/loading/model/selectors';

import { keepersListSelector } from '@entities/keeper/model/selectors';
import { getListKeepersByFilter } from '@entities/keeper/thunks/getListKeepersByFilter';

import { bem } from '@shared/utils/bem';
import { useShowMore } from '@shared/utils/hooks/use-show-more';

import { Header } from '@widgets/Header';
import { KeepersList } from '@widgets/KeepersList';

import { buttonSize } from '@shared/ui/Button/interfaces';

import './styles.scss';

const Keepers = () => {
    const [block, element] = bem('keepers');
    const keepersList = useAppSelector(keepersListSelector);
    const isLoading = useAppSelector(loadingIsLoadingSelector);
    const dispatch = useAppDispatch();

    const {
        handleHideAll,
        handleShowMore,
        isLastLimit,
        limitElements,
    } =
		useShowMore(keepersList, 10, 5);

    useEffect(() => {
        dispatch(getListKeepersByFilter({}));
    }, []);

    return (
        <div className={block()}>
            <BackgroundUsersList />
            <Header />

            {!isLoading && (
                <Container className={element('container')}>
                    <div className={element('sort-panel')}>
                        <SortCard
                            title="Сортировать"
                            value="С 1 до конца"
                        />
                        <SortCard
                            title="Период отображения"
                            value="За весь период"
                        />
                        <SortCard
                            title="За весь период"
                            value="Все звезды"
                        />
                    </div>

                    {keepersList.length !== 0 && <KeepersList keepers={limitElements} />}

                    {keepersList?.length !== 0 && isLastLimit ? (
                        <Button
                            size={buttonSize.large}
                            title="Скрыть всё"
                            onClick={handleHideAll}
                        />
                    ) : (
                        <Button
                            size={buttonSize.large}
                            title="Показать еще"
                            onClick={handleShowMore}
                        />
                    )}
                </Container>
            )}
        </div>
    );
};

export default Keepers;
