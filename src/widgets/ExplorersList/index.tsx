import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRatingCard } from '@shared/ui/UserRatingCard';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { URL_EXPLORER, getUrlExplorerById } from '@shared/constants/links';

import { ExplorersListProps } from './interface';

import './style.scss';

export const ExplorersList = ({ explorers }: ExplorersListProps) => {
    const [block, element] = bem('explorers-list');
    const navigate = useNavigate();

    return (
        <div className={block()}>
            {explorers.map(
                ({ personId, currentCourseName, rating, ...user }, index) => (
                    <UserRatingCard
                        onClick={() => {
                            navigate(getUrlExplorerById(personId.toString()));
                        }}
                        key={personId}
                        fullname={getUserFullName(user)}
                        title={`Текущая система ${currentCourseName ?? '-'}`}
                        index={index}
                        rating={rating}
                    />
                ),
            )}
        </div>
    );
};
