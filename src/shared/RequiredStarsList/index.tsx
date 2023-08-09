import {
    useEffect,
    useState,
} from 'react';

import { useAppDispatch } from '@app/providers/store/hooks';

import { DEFAULT_CHOSEN_STAR } from '@entities/galaxy/model/constants';

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
    const dispatch = useAppDispatch();

    const [fetchedSystem, setFetchedSystem] = useState<SystemResponseInterface>(DEFAULT_CHOSEN_STAR);
    const [fetchedSystemList, setFetchedSystemList] = useState<Array<SystemResponseInterface>>([]);

    useEffect(() => {
        setFetchedSystemList((prevState) => {
            console.log(fetchedSystem);
            if (!fetchedSystem.systemId) {
                return [
                    ...prevState,
                ];
            }

            return [
                ...prevState,
                fetchedSystem,
            ];
        });
    }, [fetchedSystem]);

    useEffect(() => {
        list.forEach((item) => {
            console.log(true);
            dispatch(fetchSystemById({
                payload: {
                    id: item.systemId,
                },
                setState: setFetchedSystem,
            }));
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
