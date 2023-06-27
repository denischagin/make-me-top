import { BackgroundUsersList } from '@shared/BackgroundUsersList';

import { bem } from '@shared/utils/bem';

import { Header } from '@widgets/Header';

import './styles.scss';

export const Explorers = () => {
    const [block, element] = bem('explorers');

    return (
        <div className={block()}>
            <BackgroundUsersList />
            <Header />
        </div>
    );
};
