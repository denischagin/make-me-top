import { ExplorersListProps } from './interface'
import { bem } from '@shared/utils/bem';
import "./style.scss"
import { UserRatingCard } from '@shared/UserRatingCard';
import { getUserFullName } from '@shared/utils/getUserFullName';
import { useNavigate } from 'react-router-dom';
import { MouseEventHandler } from 'react';
import { URL_EXPLORER } from '@shared/constants/links';

export const ExplorersList = ({ explorers }: ExplorersListProps) => {
    const [block, element] = bem('explorers-list');
    const navigate = useNavigate()

    return (
        <div className={block()}>
            {explorers.map((explorer, index) => (
                <UserRatingCard
                    onClick={() => {
                        navigate(`${URL_EXPLORER}/${explorer.personId}`)
                    }}
                    key={explorer.personId}
                    fullname={getUserFullName(explorer)}
                    title={`Текущая система ${explorer.currentCourseName ?? '-'}`}
                    index={index}
                    rating={explorer.rating}
                />
            ))}
        </div>
    )
}
