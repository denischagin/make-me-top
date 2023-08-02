import {
    useEffect,
    useState,
} from 'react';

import {
    fetchSystemById,
    SystemResponseInterface,
} from '@entities/orbit/api/fetchSystemById';

import { Button } from '@shared/Button';

import { ReactComponent as StarIcon } from '@shared/images/star.svg';

import { bem } from '@shared/utils/bem';

import {
    DEFAULT_LAST_FETCHED_SYSTEM,
    RequiredStarInterface,
    RequiredStarsListInterface,
} from './interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';

import './styles.scss';

export const RequiredStarsList = (props: RequiredStarsListInterface) => {
    const {
        list = [],
    } = props;

    const [block, element] = bem('required-list');

    const [resultStarsList, setResultStarsList] = useState<Array<RequiredStarInterface>>([]);
    const [lastFetchedSystem, setLastFetchedSystem] = useState<SystemResponseInterface>(DEFAULT_LAST_FETCHED_SYSTEM);

    useEffect(() => {
        setResultStarsList([]);

        list.map((item) => {
            fetchSystemById({
                id: item.systemId,
            }).then((response) => {
                setLastFetchedSystem(response);
            }); // todo https://stackoverflow.com/questions/66505445/how-to-make-api-calls-for-each-element-in-array
        });
    }, []);

    useEffect(() => {
        setResultStarsList([
            ...resultStarsList,
            {
                id: lastFetchedSystem.systemId,
                name: lastFetchedSystem.systemName,
            },
        ]);
    }, [lastFetchedSystem]);

    return (
        <div className={block()}>
            {resultStarsList.map((star) => (
                <div
                    key={star.id}
                    className={element('item')}
                >
                    <div className={element('star')}>
                        <StarIcon className={element('star-icon')} />
                        <span className={element('name')}>
                            {star.name}
                        </span>
                    </div>
                    <div className={element('info')}>
                        <div className={element('button')}>
                            <Button
                                size={buttonSize.small}
                                color={buttonColor.filled}
                                title="Перейти"
                            />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
