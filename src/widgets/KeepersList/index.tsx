import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRatingCard } from '@shared/ui/UserRatingCard';

import { bem } from '@shared/utils/bem';
import { getUserFullName } from '@shared/utils/getUserFullName';

import { URL_KEEPER } from '@shared/constants/links';

import { KeepersListProps } from './interface';

import './style.scss';

export const KeepersList = ({
    keepers,
}: KeepersListProps) => {
    const [block, element] = bem('keepers-list');
    const navigate = useNavigate();

    return (
        <div className={block()}>
            {keepers.map((keeper, index) => (
                <UserRatingCard
                    key={keeper.personId}
                    onClick={() => {
                        navigate(`${URL_KEEPER}/${keeper.personId}`);
                    }}
                    fullname={getUserFullName(keeper)}
                    title={`Галактика: ${keeper.galaxyName}`}
                    rating={keeper.rating}
                />
            ))}
        </div>
    );
};
