import {
    useEffect,
    useState,
} from 'react';

import {
    fetchSystemById,
    SystemResponseInterface,
} from '@entities/orbit/thunks/fetchSystemById';

import { Button } from '@shared/Button';

import { ReactComponent as StarIcon } from '@shared/images/star.svg';

import { bem } from '@shared/utils/bem';

import {
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

    const [fetchedSystemList, setFetchedSystemList] = useState<Array<SystemResponseInterface>>([]);

    useEffect(() => {
        list.forEach((item) => {
            fetchSystemById({
                id: item.systemId,
            }).then((response) => {
                setFetchedSystemList((prevState) => {
                    return [
                        ...prevState,
                        response,
                    ];
                });
            });
        });
    }, []);

    return (
        <div className={block()}>
            {fetchedSystemList.map((system) => (
                <div
                    key={system.systemId}
                    className={element('item')}
                >
                    <div className={element('star')}>
                        <StarIcon className={element('star-icon')} />
                        <span className={element('name')}>
                            {system.systemName}
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
