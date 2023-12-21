import { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserRatingCard } from '@shared/ui/UserRatingCard';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { getUrlExplorerById } from '@shared/constants/links';

import { ExplorersInfiniteListProps } from './interface';

import './style.scss';
import { useObserver } from '@shared/utils/hooks/use-observer';
import { useGetAllExplorersQuery } from '@entities/explorer/api/api';
import { useInfinite } from '@shared/utils/hooks/use-infinite';
import { getGalaxiesListString, getInfiniteItemIndex, getIsLastInfiniteElement, usePages } from '@shared/utils';

export const ExplorersInfiniteList = ({}: ExplorersInfiniteListProps) => {
    const [block, element] = bem('explorers-infinite-list');
    const navigate = useNavigate();

    const observerElementRef = useRef<HTMLDivElement>(null);
    const { nextPage, size, pageNumber } = usePages(0, 20);

    const { data: explorersListObject, isFetching, isSuccess } = useGetAllExplorersQuery({ page: pageNumber, size });
    const explorersList = explorersListObject?.content;
    const explorersListInfinite = useInfinite(explorersList, pageNumber);

    useObserver({
        observerElementRef,
        canCallback: pageNumber < (explorersListObject?.totalPages ?? 0) - 1 && explorersList?.length !== 0,
        state: explorersListInfinite,
        isLoading: isFetching,
    }, () => nextPage());

    return (
        <div className={block()}>
            {explorersListInfinite.map((page, pageIndex) => (
                page.map(({
                              personId,
                              rating,
                              galaxies,
                              ...user
                          }, explorerIndex) => (
                        <NavLink to={getUrlExplorerById(personId.toString())} key={personId}>
                            <UserRatingCard
                                fullname={getUserFullName(user)}
                                title={`Галактика: ${getGalaxiesListString(galaxies)} `}
                                index={getInfiniteItemIndex({ pageIndex, size, itemIndex: explorerIndex })}
                                rating={rating}
                                ref={
                                    getIsLastInfiniteElement({
                                        indent: 1,
                                        itemIndex: explorerIndex,
                                        pageIndex,
                                        pageNumber,
                                        pageLength: page.length,
                                    }) ?
                                        observerElementRef : undefined}

                            />
                        </NavLink>

                    ),
                )
            ))}
        </div>
    )
        ;
};
