import RingLoader from 'react-spinners/RingLoader';
import axios from 'axios';

import { useAppSelector } from '@app/providers/store/hooks';

import { loadingIsLoadingSelector } from '@entities/loading/model/selectors';

import { bem } from '@shared/utils/bem';

import './styles.scss';

export default function Spinner() {
    const [block, element] = bem('spinner');

    const isLoading = useAppSelector(loadingIsLoadingSelector);

    if (!isLoading) {
        return null;
    }

    return (
        <div className={block()}>
            <RingLoader
                color={'#ffffff'}
                size={150}
                className={element('loader')}
                aria-label="Загрузка"
                data-testid="loader"
            />
        </div>
    );
}