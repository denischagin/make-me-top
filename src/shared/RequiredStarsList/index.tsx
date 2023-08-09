import {
    useEffect,
    useState,
} from 'react';
import toast from 'react-hot-toast';

import {
    SystemResponseInterface,
} from '@entities/orbit/thunks/fetchSystemById';

import { Button } from '@shared/Button';

import { ReactComponent as StarIcon } from '@shared/images/star.svg';

import { bem } from '@shared/utils/bem';
import { fetchAndSetAllDependencies } from '@shared/utils/fetchAndSetAllDependencies';

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
        fetchAndSetAllDependencies({
            list,
            setStateList: setFetchedSystemList,
        }).catch(toast.error);
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
