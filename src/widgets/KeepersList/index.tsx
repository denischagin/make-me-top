import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRatingCard } from '@shared/ui/UserRatingCard';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { URL_KEEPER, getUrlKeeperById } from '@shared/constants/links';

import { KeepersListProps } from './interface';

import './style.scss';

export const KeepersList = ({ keepers }: KeepersListProps) => {
    const [block, element] = bem('keepers-list');
    const navigate = useNavigate();

    return (
        <div className={block()}>
            {keepers?.map(({ personId, rating, galaxies, ...user }, index) => (
                <UserRatingCard
                    key={personId}
                    onClick={() => {
                        navigate(getUrlKeeperById(personId.toString()));
                    }}
                    fullname={getUserFullName(user)}
                    title={`Галактики: ${!!galaxies.length && galaxies.map(({ galaxyName }) => galaxyName).join(', ')}`}
                    rating={rating}
                />
            ))}
        </div>
    );
};
