import { useRef } from 'react';

import { bem } from '@shared/utils/helpers/bem';

import { ExplorersInfiniteListProps } from './interface';

import './style.scss';
import { useObserver } from '@shared/utils/hooks/use-observer';
import { useGetAllExplorersQuery } from '@entities/explorer/api/api';
import { useInfinite } from '@shared/utils/hooks/use-infinite';
import { getGalaxiesListString, getInfiniteItemIndex, getUserFullName, usePages } from '@shared/utils';
import { NavLink } from 'react-router-dom';
import { getUrlExplorerById } from '@shared/constants/links';
import { UserRatingCard } from '@shared/ui/UserRatingCard';

export const ExplorersInfiniteList = ({}: ExplorersInfiniteListProps) => {
    const [block, element] = bem('explorers-infinite-list');

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
                                    explorerIndex === page.length - 2 ?
                                        observerElementRef : undefined
                                }

                            />
                        </NavLink>

                    ),
                )
            ))}
        </div>
    );
};
