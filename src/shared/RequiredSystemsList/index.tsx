import {
    useEffect,
    useState,
} from 'react';

import { useAppDispatch } from '@app/providers/store/hooks';

import {
    SystemResponseInterface,
} from '@entities/orbit/thunks/fetchSystemById';

import { Button } from '@shared/Button';

import { ReactComponent as StarIcon } from '@shared/images/star.svg';

import { bem } from '@shared/utils/bem';
import { fetchAndSetAllDependencies } from '@shared/utils/fetchAndSetAllDependencies';

import {
    RequiredSystemsListInterface,
} from './interfaces';
import {
    buttonColor,
    buttonSize,
} from '@shared/Button/interfaces';

import './styles.scss';

export const RequiredSystemsList = (props: RequiredSystemsListInterface) => {
    const {
        list = [],
    } = props;

    const dispatch = useAppDispatch();

    const [block, element] = bem('required-list');

    const [fetchedSystemList, setFetchedSystemList] = useState<Array<SystemResponseInterface>>([]);

    useEffect(() => {
        dispatch(fetchAndSetAllDependencies({
            list,
            setFetchedSystemList,
        }));
    }, []);

    return (
        <div className={block()}>
            {fetchedSystemList.map((system) => (
                <div
                    key={system.systemId}
                    className={element('item')}
                >
                    <div className={element('system')}>
                        <StarIcon className={element('system-icon')} />
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
