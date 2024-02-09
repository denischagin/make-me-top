import React, { useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserRatingCard } from '@shared/ui/UserRatingCard';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { getUrlKeeperById } from '@shared/constants/links';

import { KeepersInfiniteListProps } from './interface';

import './style.scss';
import { getGalaxiesListString, getInfiniteItemIndex, useInfinite, useObserver, usePages } from '@shared/utils';
import { useGetAllKeepersQuery } from '@entities/keeper/api/api';

export const KeepersInfiniteList = ({}: KeepersInfiniteListProps) => {
    const [block, element] = bem('keepers-infinite-list');
    const navigate = useNavigate();
    const observerElementRef = useRef<HTMLDivElement>(null);

    const { nextPage, size, pageNumber } = usePages(0, 20);

    const { data: keepersListObject, isFetching, isSuccess } =
        useGetAllKeepersQuery({ page: pageNumber, size });
    const keepersList = keepersListObject?.content;
    const keepersListInfinite = useInfinite(keepersList, pageNumber);

    useObserver({
        observerElementRef,
        canCallback: pageNumber < (keepersListObject?.totalPages ?? 0) - 1 && keepersList?.length !== 0,
        state: keepersListInfinite,
        isLoading: isFetching,
    }, () => nextPage());

    return (
        <div className={block()}>
            {keepersListInfinite.map((page, pageIndex) => (
                page.map(({
                              personId,
                              rating,
                              galaxies,
                              ...user
                          }, keeperIndex) => (
                        <NavLink to={getUrlKeeperById((personId.toString()))} key={personId}>
                            <UserRatingCard
                                personId={personId}
                                fullname={getUserFullName(user)}
                                title={`Галактика: ${getGalaxiesListString(galaxies)}`}
                                index={getInfiniteItemIndex({ pageIndex, size, itemIndex: keeperIndex })}
                                rating={rating}
                                ref={
                                    keeperIndex === page.length - 2 ?
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
