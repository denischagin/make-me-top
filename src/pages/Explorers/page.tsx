import {
    useEffect,
    useState,
} from 'react';
import { BackgroundUsersList } from '@shared/ui/BackgroundUsersList';
import { Button } from '@shared/ui/Button';
import { Card } from '@shared/ui/Card';
import { Container } from '@shared/ui/Container';
import { SortCard } from '@shared/ui/SortCard';
import { Typography } from '@shared/ui/Typography';

import {
    useAppDispatch,
    useAppSelector,
} from '@app/providers/store/hooks';

import { loadingIsLoadingSelector } from '@entities/loading/model/selectors';

import { explorersListSelector } from '@entities/explorer/model/selectors';
import { getListExplorersByFilter } from '@entities/explorer/thunks/getFilterExplorers';

import { bem } from '@shared/utils/bem';
import { useShowMore } from '@shared/utils/hooks/use-show-more';

import { ExplorersList } from '@widgets/ExplorersList';
import { Header } from '@widgets/Header';

import { buttonSize } from '@shared/ui/Button/interfaces';
import { cardSize } from '@shared/ui/Card/interfaces';
import { typographyVariant } from '@shared/ui/Typography/interfaces';

import './styles.scss';

const Explorers = () => {
    const explorersList = useAppSelector(explorersListSelector);

    const {
        handleHideAll,
        handleShowMore,
        isLastLimit,
        limitElements,
    } =
		useShowMore(explorersList, 10, 5);

    const dispatch = useAppDispatch();
    const isLoading = useAppSelector(loadingIsLoadingSelector);

    const [block, element] = bem('explorers');

    useEffect(() => {
        dispatch(getListExplorersByFilter({}));
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

                    <ExplorersList explorers={limitElements} />

                    {explorersList?.length !== 0 && isLastLimit ? (
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

export default Explorers;
