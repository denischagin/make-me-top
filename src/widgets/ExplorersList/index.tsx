import { MouseEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRatingCard } from '@shared/ui/UserRatingCard';

import { bem } from '@shared/utils/helpers/bem';
import { getUserFullName } from '@shared/utils/helpers/getUserFullName';

import { URL_EXPLORER } from '@shared/constants/links';

import { ExplorersListProps } from './interface';

import './style.scss';

export const ExplorersList = ({ explorers }: ExplorersListProps) => {
    const [block, element] = bem('explorers-list');
    const navigate = useNavigate();

    return (
        <div className={block()}>
            {explorers.map((explorer, index) => (
                <UserRatingCard
                    onClick={() => {
                        navigate(`/person/${explorer.personId}${URL_EXPLORER}/`);
                    }}
                    key={explorer.personId}
                    fullname={getUserFullName(explorer)}
                    title={`Текущая система ${
                        explorer.currentCourseName ?? '-'
                    }`}
                    index={index}
                    rating={explorer.rating}
                />
            ))}
        </div>
    );
};
